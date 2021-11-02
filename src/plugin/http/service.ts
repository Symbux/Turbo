import express, { Application, urlencoded, json, Request, Response } from 'express';
import { Inject, Injector } from '@symbux/injector';
import cookieParser from 'cookie-parser';
import { normalize } from 'path';
import { AbstractService } from '../../abstract/service';
import { Service } from '../../decorator/service';
import { Registry } from '../../module/registry';
import { DecoratorHelper } from '../../helper/decorator';
import { Context as HttpContext } from './context';
import { Response as HttpResponse } from './response';
import { ILogger, IService } from '../../interface/implements';
import { Authentication } from '../../module/authentication';

/**
 * This class is the base HttpPlugin's service which actually creates
 * and manages the express application.
 *
 * @class HttpService
 * @extends AbstractService
 * @implements IService
 * @provides HttpService {engine.plugin.http}, Options {engine.plugin.http.options}
 * @injects logger, engine.auth
 * @plugin Http
 */
@Service('http')
export class HttpService extends AbstractService implements IService {

	@Inject('logger') private logger!: ILogger;
	@Inject('engine.auth') private auth!: Authentication;
	private server!: Application;
	private controllers: Array<any> = [];
	private serverInstance: any;

	/**
	 * Creates an instance of the http service.
	 *
	 * @param options The options for this service.
	 * @constructor
	 */
	public constructor(options: Record<string, any>) {
		super(options);
		Injector.register('engine.plugin.http', this);
		Injector.register('engine.plugin.http.options', this.options);
	}

	/**
	 * Initialises the service.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async initialise(): Promise<void> {

		// Setup the express server.
		this.server = express();
		this.setupDefaultMiddleware();

		// Get the controllers from the registry.
		const controllers = Registry.getModules('controller');
		this.controllers = controllers.filter(controller => {
			const requiredPlugin = DecoratorHelper.getMetadata('t:plugin', 'none', controller.module);
			return requiredPlugin === 'http';
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
		const wsService = Injector.resolve('engine.plugin.ws', true);
		this.serverInstance = this.server.listen(parseInt(this.options.port), () => {
			if (wsService === null) {
				this.logger.info('PLUGIN:HTTP', `HTTP service is listening at http://localhost:${this.options.port}.`);
			} else {
				this.logger.info('PLUGIN:HTTP', `HTTP service is listening at http://localhost:${this.options.port} and ws://localhost:${this.options.port}.`);
			}
		});
	}

	/**
	 * Stops the server.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async stop(): Promise<void> {
		await this.serverInstance.close();
	}

	/**
	 * Returns the instance of the express server.
	 *
	 * @returns Application
	 * @public
	 */
	public getInstance(): Application {
		return this.server;
	}

	/**
	 * Sets up the routes.
	 *
	 * @returns void
	 * @private
	 */
	private setupRoutes(): void {
		this.logger.verbose('PLUGIN:HTTP', 'Starting route setup.');
		this.controllers.forEach(async controllerDef => {

			// Define the controller.
			const controller = controllerDef.instance;
			const basePath = DecoratorHelper.getMetadata('t:http:path', '/', controller.constructor);

			// Get the routes from the metadata.
			const routes: Array<any> = DecoratorHelper.getMetadata('t:methods', [], controller);

			// Loop through methods.
			Object.keys(routes).forEach(async classMethod => {

				// Define the route.
				const route = routes[classMethod];

				// Add the route.
				this.server[route.method.toLowerCase()](normalize(basePath + route.path.toLowerCase()), async (request: Request, response: Response) => {

					// Create a context object.
					const contextObject = new HttpContext(request, response);

					// Run the authentication.
					const authResponse = await this.auth.handle(contextObject, controller, classMethod);
					if (authResponse.failed && authResponse.stop) {
						new HttpResponse(401, {
							message: 'Unauthorized.',
						}).execute(response);
						return;
					}

					// Check for standard stop.
					if (authResponse.stop && !authResponse.failed) {
						return;
					}

					// Run the controller method.
					const output: HttpResponse = await controller[classMethod](contextObject);
					output.execute(response);
				});

				// Log verbose.
				this.logger.verbose('PLUGIN:HTTP', `Route: "${route.method.toUpperCase()} ${normalize(basePath + route.path.toLowerCase())}" was setup on controller: "${controller.constructor.name}" and method: "${classMethod}".`);
			});
		});
	}

	/**
	 * Sets up the default middleware, like cookie parser, urlencoded and json support.
	 *
	 * @returns void
	 * @private
	 */
	private setupDefaultMiddleware(): void {
		this.logger.verbose('PLUGIN:HTTP', 'Loading core middleware.');
		this.server.use(cookieParser());
		this.server.use(urlencoded({ extended: true }));
		this.server.use(json());
	}
}
