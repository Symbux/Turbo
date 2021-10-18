import { Service } from '../../decorator/service';
import { AbstractService } from '../../abstract/service';
import { ILogger } from '../../interface/logger';
import { Inject, Injector } from '@symbux/injector';
import express, { Application, urlencoded, json } from 'express';
import { DecoratorHelper } from '../../helper/decorator';
import { Registry } from '../../module/registry';
import cookieParser from 'cookie-parser';
import { normalize } from 'path';
import { HttpService } from '../http/service';

@Service('ws')
export class WsService extends AbstractService {

	@Inject('logger') private logger!: ILogger;
	@Inject('engine.plugin.http') private httpService!: HttpService;
	private server!: Application;
	private controllers: Array<any> = [];

	public constructor(options: Record<string, any>) {
		super(options);
		Injector.register('engine.plugin.ws', this);
	}

	public async initialise(): Promise<void> {
		console.log(this.httpService);

		// Setup the express server.
		this.server = express();
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
		this.server.listen(parseInt(this.options.port), () => {
			this.logger.info('PLUGIN:WS', `WS service is listening at ws://localhost:${this.options.port}.`);
		});
	}

	public setupDefaultMiddleware(): void {
		this.logger.verbose('PLUGIN:WS', 'Loading core middleware.');
		this.server.use(cookieParser());
		this.server.use(urlencoded({ extended: true }));
		this.server.use(json());
	}

	public setupRoutes(): void {
		this.logger.verbose('PLUGIN:WS', 'Starting route setup.');
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
				this.server[route.method.toLowerCase()](normalize(basePath + route.path.toLowerCase()), async (/*request: Request, response: Response*/) => {

					// Create a context object.
					// const contextObject = new HttpContext(request, response);
					// const output: HttpResponse = await controller[classMethod](contextObject);
					// output.execute(response);
				});

				// Log verbose.
				this.logger.verbose('PLUGIN:WS', `Route: "${route.method.toUpperCase()} ${normalize(basePath + route.path.toLowerCase())}" was setup on controller: "${controller.constructor.name}" and method: "${classMethod}".`);
			});
		});
	}
}
