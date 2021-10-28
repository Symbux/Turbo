import { Inject, Injector } from '@symbux/injector';
import { ILogger } from '../interface/implements';
import { Registry } from './registry';

export class Services {

	@Inject('logger') private logger!: ILogger;
	private services: Array<any> = [];

	public constructor() {
		Injector.register('engine.services', this);
	}

	public async initialise(): Promise<void> {

		// Get the services from the registry.
		this.services = Registry.getModules('service');

		// Initialise each service.
		for await (const service of this.services) {
			this.logger.verbose('SERVICE', `Initialising service: ${service.module.name}.`);
			await service.instance.initialise();
		}
	}

	public async start(): Promise<void> {

		// Get the services from the registry.
		this.services = Registry.getModules('service');

		// Start each service.
		for await (const service of this.services) {
			this.logger.verbose('SERVICE', `Starting service: ${service.module.name}.`);
			await service.instance.start();
		}
	}

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
