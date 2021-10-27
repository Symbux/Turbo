# Turbo :: Tasks

A task in the Turbo engine is a class that implements `ITask`. The task can run
certain things at specific times (based on cron expressions) allowing you to run
daily cleanups of a database, or sending a daily report to a mailing list. You can
of course import and use fibres in this context for more CPU-intensive work.

> Has full application scope, unlike fibres.

```typescript
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
```
