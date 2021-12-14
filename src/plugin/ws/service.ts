import { Service } from '../../decorator/service';
import { AbstractService } from '../../abstract/service';
import { IService } from '../../interface/implements';
import { Inject, Injector } from '@symbux/injector';
import express, { Application as HttpApplication, urlencoded, json, Request } from 'express';
import { DecoratorHelper } from '../../helper/decorator';
import { Registry } from '../../module/registry';
import cookieParser from 'cookie-parser';
import { HttpService } from '../http/service';
import expressWs, { Application } from 'express-ws';
import * as WS from 'ws';
import { IOptions, IPacket, IWsConnections, IWsConnection } from './types';
import { Context as WsContext } from './context';
import { Translator } from '../../module/translator';

/**
 * This class is the base WsPlugin's service which actually creates
 * and manages the express application.
 *
 * @class WsService
 * @extends AbstractService
 * @implements IService
 * @provides WsService {tp.ws}, Options {tp.ws.options}
 * @injects logger, turbo.auth, tp.http
 * @plugin Ws
 */
@Service('ws')
export class WsService extends AbstractService implements IService {

	@Inject('tp.http', true) private httpService!: HttpService;
	@Inject('turbo.translator') private translator!: Translator;
	private server!: Application;
	private controllers: Array<any> = [];
	private serverInstance: any;
	private connections: IWsConnections = {};

	/**
	 * Creates an instance of the ws service.
	 *
	 * @param options The options for this service.
	 * @constructor
	 */
	public constructor(options: IOptions) {
		super(options);
		Injector.register('tp.ws', this);
		Injector.register('tp.ws.options', this.options);
	}

	/**
	 * Initialises the service.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async initialise(): Promise<void> {
		let server: HttpApplication;
		if (this.httpService === null) {
			server = express();
		} else {
			server = this.httpService.getInstance();
		}

		// Verify; if no http service is available then a port has to be defined.
		if (this.httpService === null && this.options.port === undefined) {
			throw new Error('No http service available please define a port in the WsPlugin config.');
		}

		// Setup the express server.
		expressWs(server, undefined, {
			wsOptions: this.options.options || {},
		});

		// Assign the server.
		this.server = (server as any);

		// Setup the base middleware.
		this.setupDefaultMiddleware();

		// Get the controllers from the registry.
		const controllers = Registry.getModules('controller');
		this.controllers = controllers.filter(controller => {
			const requiredPlugin = DecoratorHelper.getMetadata('t:plugin', 'none', controller.module);
			return requiredPlugin === 'ws';
		});

		// Setup the routes.
		this.setupRoutes();
	}

	/**
	 * Starts the server.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async start(): Promise<void> {
		if (this.httpService === null) {
			this.serverInstance = this.server.listen(parseInt(this.options.port), () => {
				this.logger.info('PLUGIN:WS', `WS service is listening at ws://localhost:${this.options.port}.`);
			});
		}
	}

	/**
	 * Stops the server.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async stop(): Promise<void> {
		if (this.httpService === null) {
			await this.serverInstance.close();
		}
	}

	/**
	 * Gets the connection based on socket key.
	 *
	 * @param socketKey The socket key.
	 * @returns IWsConnection
	 * @public
	 */
	public getConnection(socketKey: string): IWsConnection {
		return this.connections[socketKey];
	}

	/**
	 * Gets all connected clients.
	 *
	 * @returns Array<IWsConnection>
	 * @public
	 */
	public getConnections(): {[key: string]: IWsConnection} {
		return this.connections;
	}

	/**
	 * Will broadcast a packet to all connected clients.
	 *
	 * @param message The packet to send.
	 * @public
	 */
	public broadcast(message: IPacket): void {
		Object.keys(this.getConnections()).forEach((key) => {
			this.getConnection(key).socket.send(JSON.stringify(message));
		});
	}

	/**
	 * Broadcasts a raw message all connected clients.
	 *
	 * @param message Raw content to send (should be a string).
	 * @public
	 */
	public broadcastRaw(message: any): void {
		Object.keys(this.getConnections()).forEach((key) => {
			this.getConnection(key).socket.send(message);
		});
	}

	/**
	 * Sets up the default middleware, like cookie parser, urlencoded and json support.
	 *
	 * @returns void
	 * @private
	 */
	private setupDefaultMiddleware(): void {
		this.logger.verbose('PLUGIN:WS', 'Loading core middleware.');
		this.server.use(cookieParser());
		this.server.use(urlencoded({ extended: true }));
		this.server.use(json());
	}

	/**
	 * Sets up the routes.
	 *
	 * @returns void
	 * @private
	 */
	private setupRoutes(): void {
		this.logger.verbose('PLUGIN:WS', 'Starting route setup.');
		this.server.ws(this.options.path || '/ws', (socket: WS, request: Request) => {

			// Notify new connection.
			this.logger.verbose('PLUGIN:WS', 'New websocket connection.');

			// On socket open.
			this.onOpen(socket, request);

			// On socket close.
			socket.on('close', (code: number, reason: string) => {
				this.onClose(socket, request, code, reason);
			});

			// On socket error.
			socket.on('error', (err: Error) => {
				this.onError(socket, request, err);
			});

			// On socket message.
			socket.on('message', (message: string) => {
				this.onMessage(socket, request, message);
			});
		});
	}

	/**
	 * Called when a connection comes in from a client.
	 *
	 * @param socket The socket instance.
	 * @param request The express request instance.
	 * @returns Promise<void>
	 * @private
	 * @async
	 */
	private async onOpen(socket: WS, request: Request): Promise<void> {

		// Get any subscriptions.
		const subscriptions = this.getSubscriptions(request);

		// Add to the connections object.
		const uniqueId = String(request.headers['sec-websocket-key']);
		this.connections[uniqueId] = {
			socket: socket,
			request: request as any,
			session: new Map<string, any>(),
			subscriptions: subscriptions,
			languages: request.acceptsLanguages(),
		};

		// Notify console.
		this.logger.info('WEBSOCKET', `Connection received with ID: ${uniqueId}.`);
		this.logger.info('WEBSOCKET', `Information, connection count: ${Object.keys(this.connections).length}.`);
	}

	/**
	 * Called when a connection is closed.
	 *
	 * @param socket The socket instance.
	 * @param request The express request instance.
	 * @param code The close code.
	 * @param reason The close reason.
	 * @returns Promise<void>
	 * @private
	 * @async
	 */
	private async onClose(socket: WS, request: Request, code: number, reason: string): Promise<void> {

		// Remove from the connections object.
		const uniqueId = String(request.headers['sec-websocket-key']);
		delete this.connections[uniqueId];

		// Notify console.
		this.logger.info('WEBSOCKET', `Connection closed with code ${code}${reason !== '' ? ` and reason: ${reason}.` : '.'}`);
		this.logger.info('WEBSOCKET', `Information, connection count: ${Object.keys(this.connections).length}.`);
	}

	/**
	 * Called when a connection throws an error.
	 *
	 * @param socket The socket instance.
	 * @param request The express request instance.
	 * @param err The connection error.
	 * @returns Promise<void>
	 * @private
	 * @async
	 */
	private async onError(socket: WS, request: Request, err: Error): Promise<void> {

		// Remove from the connections object.
		const uniqueId = String(request.headers['sec-websocket-key']);
		delete this.connections[uniqueId];

		// Notify console.
		this.logger.error('WEBSOCKET', `Connection incurred an error: ${err.message}.`, err);
		this.logger.info('WEBSOCKET', `Information, connection count: ${Object.keys(this.connections).length}.`);
	}

	/**
	 * Called when a connection receives a message from the client.
	 *
	 * @param socket The socket instance.
	 * @param request The express request instance.
	 * @param message The message raw string.
	 * @returns Promise<void>
	 * @private
	 * @async
	 */
	private async onMessage(socket: WS, request: Request, message: string): Promise<void> {
		try {

			// Define the unique ID.
			const uniqueId = String(request.headers['sec-websocket-key']);

			// Convert the message to JSON.
			const packet = JSON.parse(message);
			if (typeof packet.command === 'undefined') throw new Error('Given websocket message is invalid');

			// Now search for a valid controller and method.
			const [ namespace, method ]: [string, string] = packet.command.split('/');
			const controller = this.findController(namespace, method);

			// Check for valid controller.
			if (typeof controller === 'undefined') throw new Error('Given websocket command is invalid');

			// Create a context object.
			const contextObject = new WsContext(request, socket, this, packet, this.connections[uniqueId].languages);

			// Run the authentication.
			const authResponse = await this.auth.handle('ws', contextObject, controller.instance, method);
			if (authResponse.failed && authResponse.stop) {
				contextObject.send({
					command: 'error',
					content: {
						message: 'Authentication failed.',
					},
				});
				return;
			}

			// Check for standard stop.
			if (authResponse.stop && !authResponse.failed) {
				return;
			}

			// Run the controller method.
			await controller.instance[method](contextObject);

		} catch(err) {
			this.logger.error('PLUGIN:WS', `There was an error processing the message: ${(err as Error).message}.`, err as Error);
			socket.send(JSON.stringify({
				command: 'error',
				content: { status: false, message: 'There was an error processing your request.' },
			}));
		}
	}

	/**
	 * Finds a controller by namespace and method.
	 *
	 * @param namespace The controller namespace to search for.
	 * @param method The controller method to search for.
	 * @returns any
	 * @private
	 */
	private findController(namespace: string, method: string): any {
		for (const controller of this.controllers) {
			const requiredNamespace = DecoratorHelper.getMetadata('t:ws:namespace', 'none', controller.module);
			if (requiredNamespace !== namespace) continue;
			if (typeof controller.instance[method] !== 'function') continue;
			return controller;
		}
	}

	/**
	 * Will check for any subscriptions from the express request
	 * as custom headers or defined in the `sec-websocket-protocol`
	 * header.
	 *
	 * @param request The express request object.
	 * @returns Array<string>
	 * @private
	 */
	private getSubscriptions(request: Request): Array<string> {

		// Define subscriptions as an empty array.
		let subscriptions: Array<string> = [];

		// Check for custom headers (using a custom client).
		if (request.headers['subscriptions'] !== undefined) {
			subscriptions.push(...String(request.headers['subscriptions']).split(','));
		}

		// Check for subscriptions in the protocol.
		if (typeof request.headers['sec-websocket-protocol'] !== 'undefined') {
			const protocols: string[] = String(request.headers['sec-websocket-protocol']).split(',');
			protocols.forEach(protocol => {
				if (protocol.includes('SUB-')) {
					subscriptions = protocol.replace('SUB-', '').split('-');
				}
			});
		}

		// Return subscriptions.
		return subscriptions;
	}
}
