import { Inject } from '@symbux/injector';
import { Task, ILogger, Ws } from '../../src';

interface ITask {
	execute: () => Promise<void>;
}

@Task('broadcast', '*/1 * * * *')
export default class BroadcastTask implements ITask {

	@Inject('logger') private logger!: ILogger;
	@Inject('tp.ws') private service!: Ws.Service;

	public async execute(): Promise<void> {
		this.logger.verbose('TASK:BROADCAST', 'Broadcasting server time.');
		this.service.broadcast({
			command: '::internal/time',
			content: {
				serverTime: new Date().valueOf(),
			},
		});
	}
}
