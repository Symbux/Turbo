import { Application, Request, Response } from 'express';
import express, { urlencoded, json } from 'express';
import { Injector } from '@symbux/injector';
import cookieParser from 'cookie-parser';
import { normalize } from 'node:path';
import { AbstractService } from '../../abstract/service';
import { Service } from '../../decorator/service';
import { Registry } from '../../module/registry';
import { DecoratorHelper } from '../../helper/decorator';
import { Context as HttpContext } from './context';
import { Response as HttpResponse } from './response';
import { IService } from '../../interface/implements';
import { IOptions, ICache } from './types';
import compression from 'compression';
import helmet from 'helmet';
import fileUpload from 'express-fileupload';

/**
 * This class is the base HttpPlugin's service which actually creates
 * and manages the express application.
 *
 * @class HttpService
 * @extends AbstractService
 * @implements IService
 * @provides HttpService {tp.http}, Options {tp.http.options}
 * @injects logger, turbo.auth
 * @plugin Http
 */
@Service('http')
export class HttpService extends AbstractService implements IService {
	private server!: Application;
	private controllers: Array<any> = [];
	private serverInstance: any;
	private cache?: ICache;
	private title = 'PLUGIN:HTTP';

	/**
	 * Creates an instance of the http service.
	 *
	 * @param options The options for this service.
	 * @constructor
	 */
	public constructor(options: IOptions) {
		super(options);
		Injector.register('tp.http', this);
		Injector.register('tp.http.options', this.options);
		if (options.cache) this.cache = options.cache;
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
		this.setupTrustProxy();
		this.setupHelmet();
		this.setupCompression();
		this.setupRoutes();
		this.setupStatic();
	}

	/**
	 * Starts the server.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async start(): Promise<void> {
		const wsService = Injector.resolve('turbo.plugin.ws', true);
		this.serverInstance = this.server.listen(parseInt(this.options.port), () => {
			if (wsService === null) {
				this.logger.info(this.title, `HTTP service is listening at http://localhost:${this.options.port}.`);
			} else {
				this.logger.info(this.title, `HTTP service is listening at http://localhost:${this.options.port} and ws://localhost:${this.options.port}.`);
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
		this.logger.verbose(this.title, 'Starting route setup.');
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

				// Turn the routes into an array.
				const routePaths = Array.isArray(route.path) ? route.path : [route.path];

				// Add the route.
				routePaths.forEach((routePath: string) => {
					this.server[route.method.toLowerCase()](normalize(basePath + routePath.toLowerCase()), async (request: Request, response: Response) => {

						// Create wrapping try; catch.
						try {

							// Check for route catch.
							const catchMethod = DecoratorHelper.getMetadata('t:http:catch', null, controller, classMethod);

							// Create a context object.
							const contextObject = new HttpContext(request, response);

							// Run the authentication.
							const authSuccess = await this.auth.handle('http', contextObject, controller, classMethod);
							if (!authSuccess) {
								new HttpResponse(401, {
									message: 'Unauthorized.',
								}).execute(response);
								return;
							}

							// Check for valid cache for this request.
							const cacheKey = normalize(basePath + routePath.toLowerCase());
							if (this.options.cache && this.cache) {

								// Check for cache hit.
								const cacheData = await this.cache.get(cacheKey);
								if (cacheData) {

									// Log cache hit, and return cache.
									this.logger.verbose(this.title, `Cache hit for ${cacheKey}.`);
									new HttpResponse(304, cacheData).execute(response);
									return;
								}
							}

							// Run the controller method.
							try {
								const output: HttpResponse | undefined = await controller[classMethod](contextObject);
								if (output) {
									output.execute(response);
								}

								// Check for cache support.
								if (output?.isCacheable()) {

									// Check for cache support.
									if (this.options.cache && this.cache) {

										// Set the cache.
										await this.cache.set(cacheKey, output.executeForCache(response));
									}
								}
							} catch(err) {
								if (!catchMethod) throw err as Error;
								this.logger.verbose(this.title, `Caught error in controller ${controller.constructor.name}::${classMethod}, catch provided, executing.`);
								catchMethod(err as Error).execute(response);
							}

							// Log verbose.
							this.logger.verbose(this.title, `Route: "${route.method.toUpperCase()} ${normalize(basePath + routePath.toLowerCase())}" called on controller: "${controller.constructor.name}" and method: "${classMethod}".`);

						} catch(err) {
							this.logger.verbose(this.title, `Caught error in controller ${controller.constructor.name}::${classMethod}, no catch provided, returning 500.`);
							this.logger.error(this.title, `Noted caught error: ${(err as Error).message}, within: ${controller.constructor.name}::${classMethod}.`, (err as Error));
							response.sendStatus(500).end();
						}
					});
				});
			});
		});
	}

	/**
	 * Instructs express about which proxies to trust, provided by an array of
	 * supported strings from the options for the plugin.
	 */
	public setupTrustProxy(): void {
		const trustProxy = (this.options as IOptions).security?.trustProxy;
		if (trustProxy && Array.isArray(trustProxy)) {
			this.server.set('trust proxy', trustProxy.join(', '));
		}
	}

	/**
	 * If helmet is enabled, will attempt to setup the helmet middleware library
	 * as a security layer on top of the express server. This package is a collection
	 * of middlewares that can be enabled/disabled via the settings to help secure
	 * the express server.
	 */
	public setupHelmet(): void {
		const enableHelmet = (this.options as IOptions).security?.enableHelmet;
		const helmetOptions = (this.options as IOptions).security?.helmetOptions;
		if (enableHelmet) {
			if (helmetOptions) {
				this.server.use(helmet(helmetOptions));
			} else {
				this.server.use(helmet());
			}
		}
	}

	/**
	 * This will check the options and check to see whether compression is enabled,
	 * this feature is not default, and will specifically need to be turned on, this
	 * is due to the engine being an API-first system, and therefore in general usage
	 * of the system would not require compression realistically, but can be enabled.
	 */
	public setupCompression(): void {
		const options = this.options as IOptions;
		if (!options.compression) return;
		if (!options.compression.enabled) return;
		this.server.use(compression(options.compression.options));
	}

	/**
	 * Allows the use of hosting static files within express, provided by an
	 * array of folder and [optional] pathnames from the plugin options.
	 */
	public setupStatic(): void {
		const staticFolders = (this.options as IOptions).static;
		if (staticFolders && Array.isArray(staticFolders)) {
			staticFolders.forEach(folder => {
				if (!folder.pathname) {
					this.server.use(express.static(folder.folder));
				} else {
					this.server.use(folder.pathname, express.static(folder.folder));
				}
			});
		}
	}

	/**
	 * Sets up the default middleware, like cookie parser, urlencoded and json support.
	 *
	 * @returns void
	 * @private
	 */
	private setupDefaultMiddleware(): void {
		this.logger.verbose(this.title, 'Loading core middleware.');
		this.server.use(cookieParser());
		this.server.use(urlencoded({ extended: true }));
		this.server.use(json());
		if (this.options.uploads && this.options.uploads.enabled) {
			this.server.use(fileUpload({
				useTempFiles: true,
				createParentPath: true,
				safeFileNames: true,
				preserveExtension: true,
				abortOnLimit: true,
				tempFileDir: this.options.uploads.tempFileDir || '/tmp/',
				uploadTimeout: this.options.uploads.timeout || 60000,
				debug: this.options.uploads.debug || false,
				limits: {
					fileSize: this.options.uploads.maxFileSize || 50 * 1024 * 1024,
				},
			}));
		}
	}
}
