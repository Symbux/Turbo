import { IService } from '../../src';
import { AbstractService, Service } from '../../src';

@Service('example')
export class ExampleService extends AbstractService implements IService {

	public async initialise(): Promise<void> {
		console.log('ExampleService initialising...');
		await this.wait(2500);
		console.log('ExampleService initialised.');
	}

	public async start(): Promise<void> {
		console.log('ExampleService starting...');
		await this.wait(2500);
		console.log('ExampleService started.');
	}

	public async stop(): Promise<void> {
		console.log('ExampleService stopping...');
		await this.wait(2500);
		console.log('ExampleService stopped.');
	}

	public wait(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
