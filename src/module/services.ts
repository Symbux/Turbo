import { Inject, Injector } from '@symbux/injector';
import { ILogger } from '../interface/implements';
import { Registry } from './registry';

/**
 * The services module is in charge of calling all the services
 * that are registered by autowire, or plugins, and initialising
 * them as the engine calls them, alongside being able to start,
 * and stop them.
 *
 * @class Services
 * @provides Services {turbo.services}
 * @injects logger
 */
export class Services {

	@Inject('logger') private logger!: ILogger;
	private services: Array<any> = [];

	/**
	 * Creates instance of Services.
	 *
	 * @constructor
	 */
	public constructor() {
		Injector.register('turbo.services', this);
	}

	/**
	 * Initialises all services and calls the initialise method
	 * in each service.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async initialise(): Promise<void> {

		// Get the services from the registry.
		this.services = Registry.getModules('service');

		// Initialise each service.
		for await (const service of this.services) {
			this.logger.verbose('SERVICE', `Initialising service: ${service.module.name}.`);
			await service.instance.initialise();
		}
	}

	/**
	 * Starts all services by calling the start method in each service.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async start(): Promise<void> {

		// Get the services from the registry.
		this.services = Registry.getModules('service');

		// Start each service.
		for await (const service of this.services) {
			this.logger.verbose('SERVICE', `Starting service: ${service.module.name}.`);
			await service.instance.start();
		}
	}

	/**
	 * Stops all services by calling the stop method in each service.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async stop(): Promise<void> {

		// Get the services from the registry.
		this.services = Registry.getModules('service');

		// Stop each service.
		for await (const service of this.services) {
			this.logger.verbose('SERVICE', `Stopping service: ${service.module.name}.`);
			await service.instance.stop();
		}
	}
}
