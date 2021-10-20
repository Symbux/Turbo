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
import { ILogger } from '../../interface/logger';

@Service('http')
export class HttpService extends AbstractService {

	@Inject('logger') private logger!: ILogger;
	private server!: Application;
	private controllers: Array<any> = [];

	public constructor(options: Record<string, any>) {
		super(options);
		Injector.register('engine.plugin.http', this);
		Injector.register('engine.plugin.http.options', this.options);
	}

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

	public async start(): Promise<void> {
		const wsService = Injector.resolve('engine.plugin.ws', true);
		this.server.listen(parseInt(this.options.port), () => {
			if (wsService === null) {
				this.logger.info('PLUGIN:HTTP', `HTTP service is listening at http://localhost:${this.options.port}.`);
			} else {
				this.logger.info('PLUGIN:HTTP', `HTTP service is listening at http://localhost:${this.options.port} and ws://localhost:${this.options.port}.`);
			}
		});
	}

	public setupDefaultMiddleware(): void {
		this.logger.verbose('PLUGIN:HTTP', 'Loading core middleware.');
		this.server.use(cookieParser());
		this.server.use(urlencoded({ extended: true }));
		this.server.use(json());
	}

	public setupRoutes(): void {
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
					const output: HttpResponse = await controller[classMethod](contextObject);
					output.execute(response);
				});

				// Log verbose.
				this.logger.verbose('PLUGIN:HTTP', `Route: "${route.method.toUpperCase()} ${normalize(basePath + route.path.toLowerCase())}" was setup on controller: "${controller.constructor.name}" and method: "${classMethod}".`);
			});
		});
	}

	public getInstance(): Application {
		return this.server;
	}
}
