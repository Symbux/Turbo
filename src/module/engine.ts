import { IOptions } from '../interface/structures';
import { IPlugin } from '../interface/implements';
import { Services } from './services';
import { Registry } from './registry';
import { Inject, Injector } from '@symbux/injector';
import { Logger } from './logger';
import { Runner } from './runner';
import { Autowire } from './autowire';
import { extname } from 'path';
import { FibreManager } from '../fibre/manager';
import { Authentication } from './authentication';
import { DecoratorHelper } from '..';

/**
 * The engine class is the main class of the application.
 * It is responsible for starting the server and listening to the port.
 * It also handles the autowiring of the modules.
 *
 * @class Engine
 * @provides Engine {engine.core}, IOptions {engine.options}
 * @injects logger
 */
export class Engine {
	@Inject() private logger!: Logger;
	private services: Services;
	private runner: Runner;
	private autowire: Autowire;

	/**
	 * Creates a new instance of the engine.
	 *
	 * @param options Turbo options.
	 * @constructor
	 */
	public constructor(private options: Partial<IOptions>) {

		// Define the log levels.
		let logLevels = ['info', 'warn', 'error'];
		if (options.logLevels) logLevels = options.logLevels;
		Registry.set('engine.logger.levels',logLevels);

		// Log the engine is starting.
		this.logger.info('ENGINE', 'Turbo engine is being initialised.');

		// Register base injections.
		Injector.register('engine.core', this);
		Injector.register('engine.options', this.options);
		Registry.set('engine.status', 'main');
		Registry.set('engine.version', '0.2.3');

		// Check the mode we are running in.
		const extension = extname(__filename);
		if (extension === '.js') Registry.set('engine.mode', 'production');
		if (extension === '.ts') Registry.set('engine.mode', 'development');

		// Initialise engine components.
		new Authentication();
		this.services = new Services();
		this.runner = new Runner();

		// Initialise fibre processor.
		FibreManager.startService();

		// Initialise autowire.
		if (this.options.autowire) {
			this.logger.verbose('ENGINE', 'Autowire is enabled.');
		}
		this.autowire = new Autowire(this, this.options);

		// Register shutdown.
		process.on('SIGINT', () => {
			this.logger.info('ENGINE', 'Turbo engine is shutting down.');
			this.stop();
		});
	}

	/**
	 * Accepts a plugin and then will register it internally.
	 *
	 * @param plugin The plugin to be added.
	 * @returns void
	 * @public
	 */
	public use(plugin: IPlugin): void {
		this.logger.verbose('ENGINE', `Plugin: "${plugin.name}" is being registered.`);
		plugin.install(this);
		this.logger.verbose('ENGINE', `Plugin: "${plugin.name}" was registered`);
	}

	/**
	 * Registers a module to the engine. To pass options to
	 * the module, please use `registerSingle` instead.
	 *
	 * @param module The module to be registered.
	 * @returns void
	 * @public
	 */
	public register(modules: Array<any>): void {
		modules.forEach(module => {
			this.registerModule(module);
		});
	}

	/**
	 * This method will register a single module with options.
	 *
	 * @param module The module to be registered.
	 * @param options Any options to pass to the module.
	 * @returns void
	 * @public
	 */
	public registerSingle(module: any, options?: Record<string, any>): void {
		const decoratorOptions = DecoratorHelper.getMetadata('t:options', false, module);
		this.registerModule(module, options || decoratorOptions);
	}

	/**
	 * Starts the Turbo engine.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async start(): Promise<void> {
		this.logger.info('ENGINE', 'Turbo engine is starting.');

		// Initialise autowire.
		if (this.options.autowire) {
			await this.autowire.wireup();
		}

		// Initialise components.
		this.logger.verbose('ENGINE', 'Initialising engine components.');
		await this.services.initialise();
		await this.runner.initialise();
		this.logger.verbose('ENGINE', 'Engine components were initialised.');

		// Start components.
		this.logger.verbose('ENGINE', 'Starting engine components.');
		await this.services.start();
		await this.runner.start();
		this.logger.verbose('ENGINE', 'Engine components were started.');

		// Notify the engine is running.
		this.logger.info('ENGINE', 'Turbo engine is running.');
	}

	/**
	 * Stops the Turbo engine.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async stop(): Promise<void> {

		// Shutdown services and components.
		await this.services.stop();
		await this.runner.stop();

		// Kill all open threads.
		await FibreManager.killAll();

		// Now kill self process.
		process.exit(0);
	}

	/**
	 * This method will add the module to the registry.
	 *
	 * @param module The module instance.
	 * @param options Options to be added to the constructor.
	 * @returns void
	 * @private
	 */
	private registerModule(module: any, options?: Record<string, any>): void {
		this.logger.verbose('ENGINE', `Registering module: "${module.name}"${options ? ' with options: ' : ''}${JSON.stringify(options) || ''}.`);
		const moduleType = Reflect.getMetadata('t:type', module);
		const moduleName = Reflect.getMetadata('t:name', module);
		const isProvider = DecoratorHelper.getMetadata('engine:module', '', module) === 'provider';

		Registry.setModule(moduleType, moduleName, {
			module: module,
			options: options,
			instance: !isProvider ? new module(options || {}) : null,
		});

		this.logger.verbose('ENGINE', `Module: ${module.name} was registered.`);
	}
}
