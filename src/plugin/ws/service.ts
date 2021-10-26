import { Service } from '../../decorator/service';
import { AbstractService } from '../../abstract/service';
import { ILogger } from '../../interface/logger';
import { Inject, Injector } from '@symbux/injector';
import express, { Application as HttpApplication, urlencoded, json, Request } from 'express';
import { DecoratorHelper } from '../../helper/decorator';
import { Registry } from '../../module/registry';
import cookieParser from 'cookie-parser';
import { HttpService } from '../http/service';
import expressWs, { Application } from 'express-ws';
import * as WS from 'ws';
import { IPluginOptions } from './types';
import { Context as WsContext } from './context';

@Service('ws')
export class WsService extends AbstractService {

	@Inject('logger') private logger!: ILogger;
	@Inject('engine.plugin.http', true) private httpService!: HttpService;
	private server!: Application;
	private controllers: Array<any> = [];
	private serverInstance: any;
	private connections: {
		[key: string]: {
			socket: WS,
			request: Request,
			subscriptions: Array<string>,
			session: Record<string, any>
		}} = {};

	public constructor(options: IPluginOptions) {
		super(options);
		Injector.register('engine.plugin.ws', this);
		Injector.register('engine.plugin.ws.options', this.options);
	}

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

	public async start(): Promise<void> {
		if (this.httpService === null) {
			this.serverInstance = this.server.listen(parseInt(this.options.port), () => {
				this.logger.info('PLUGIN:WS', `WS service is listening at ws://localhost:${this.options.port}.`);
			});
		}
	}

	public async stop(): Promise<void> {
		if (this.httpService === null) {
			await this.serverInstance.close();
		}
	}

	public setupDefaultMiddleware(): void {
		this.logger.verbose('PLUGIN:WS', 'Loading core middleware.');
		this.server.use(cookieParser());
		this.server.use(urlencoded({ extended: true }));
		this.server.use(json());
	}

	public setupRoutes(): void {
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

	public async onOpen(socket: WS, request: Request): Promise<void> {

		// Get any subscriptions.
		const subscriptions = this.getSubscriptions(request);

		// Add to the connections object.
		const uniqueId = String(request.headers['sec-websocket-key']);
		this.connections[uniqueId] = {
			socket: socket,
			request: request,
			session: new Map<string, any>(),
			subscriptions: subscriptions,
		};

		// Notify console.
		this.logger.info('WEBSOCKET', `Connection received with ID: ${uniqueId}.`);
		this.logger.info('WEBSOCKET', `Information, connection count: ${Object.keys(this.connections).length}.`);
	}

	public async onClose(socket: WS, request: Request, code: number, reason: string): Promise<void> {

		// Remove from the connections object.
		const uniqueId = String(request.headers['sec-websocket-key']);
		delete this.connections[uniqueId];

		// Notify console.
		this.logger.info('WEBSOCKET', `Connection closed with code ${code}${reason !== '' ? ` and reason: ${reason}.` : '.'}`);
		this.logger.info('WEBSOCKET', `Information, connection count: ${Object.keys(this.connections).length}.`);
	}

	public async onError(socket: WS, request: Request, err: Error): Promise<void> {

		// Remove from the connections object.
		const uniqueId = String(request.headers['sec-websocket-key']);
		delete this.connections[uniqueId];

		// Notify console.
		this.logger.error('WEBSOCKET', `Connection incurred an error: ${err.message}.`, err);
		this.logger.info('WEBSOCKET', `Information, connection count: ${Object.keys(this.connections).length}.`);
	}

	public async onMessage(socket: WS, request: Request, message: string): Promise<void> {
		try {

			// Convert the message to JSON.
			const packet = JSON.parse(message);
			if (typeof packet.command === 'undefined') throw new Error('Given websocket message is invalid');

			// Now search for a valid controller and method.
			const [ namespace, method ]: [string, string] = packet.command.split('/');
			const controller = this.findController(namespace, method);

			// Check for valid controller.
			if (typeof controller === 'undefined') throw new Error('Given websocket command is invalid');

			// Create a context object.
			const contextObject = new WsContext(request, socket, this, packet);
			await controller.instance[method](contextObject);

		} catch(err) {
			this.logger.error('PLUGIN:WS', `There was an error processing the message: ${(err as Error).message}.`, err as Error);
			socket.send(JSON.stringify({
				command: 'error',
				content: { status: false, message: 'There was an error processing your request.' },
			}));
		}
	}

	private findController(namespace: string, method: string): any {
		for (const controller of this.controllers) {
			const requiredNamespace = DecoratorHelper.getMetadata('t:ws:namespace', 'none', controller.module);
			if (requiredNamespace !== namespace) continue;
			if (typeof controller.instance[method] !== 'function') continue;
			return controller;
		}
	}

	public getConnection(socketKey: string): { socket: WS, request: Request, subscriptions: Array<string>, session: Record<string, any> } {
		return this.connections[socketKey];
	}

	public getConnections(): {[key: string]: { socket: WS, request: Request, subscriptions: Array<string>, session: Record<string, any> }} {
		return this.connections;
	}

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
