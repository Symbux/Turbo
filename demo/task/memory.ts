import { Inject } from '@symbux/injector';
import { Task, ILogger } from '../../src';


interface ITask {
	execute: () => Promise<void>;
}

@Task('memory', '*/15 * * * *')
export default class MemoryTask implements ITask {

	@Inject('logger') private logger!: ILogger;

	public async execute(): Promise<void> {
		const used = process.memoryUsage().heapUsed / 1024 / 1024;
		this.logger.info('TASK:MEMORY', `Application is using approximately ${Math.round(used * 100) / 100} MB`);
	}
}
