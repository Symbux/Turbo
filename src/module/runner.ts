import { Inject, Injector } from '@symbux/injector';
import { ILogger } from '../interface/implements';
import { Registry } from './registry';
import { CronJob } from 'cron';
import { DecoratorHelper } from '..';
import { durationToHuman } from '../helper/misc';

export class Runner {

	@Inject('logger') private logger!: ILogger;
	private tasks: Array<{ module: any, instance: any, options: any, job: CronJob }> = [];
	private running = false;

	public constructor() {
		Injector.register('engine.runner', this);
	}

	public async initialise(): Promise<void> {

		// Get the tasks from the registry.
		this.tasks = Registry.getModules('task');

		// Create the instances of the tasks.
		this.tasks.forEach(task => {
			this.logger.verbose('RUNNER', `Setting up task: "${task.module.name}".`);

			// Extract schedule.
			const schedule: string | null = DecoratorHelper.getMetadata('t:task:schedule', null, task.module);

			// If no schedule provided, note error in console, proceed.
			if (schedule === null) {
				this.logger.error('RUNNER', `Task "${task.module.name}" has no valid schedule.`);
				return;
			}

			// Create the cron job and assign it back to the task object.
			task.job = new CronJob(schedule, async () => {

				// Log job start.
				const startTime = new Date().valueOf();
				this.logger.verbose('RUNNER', `Task "${task.module.name}" is running.`);

				// Execute the task.
				await task.instance.execute();

				// Log job end.
				const durationTime = durationToHuman(new Date().valueOf() - startTime);
				this.logger.verbose('RUNNER', `Task "${task.module.name}" finished in "${durationTime || '< 1 second.'}".`);
			}, null, false, 'Europe/London');
		});
	}

	public async start(): Promise<void> {

		// Set the status to running.
		this.running = true;

		// Loop tasks and start them.
		this.tasks.forEach(task => {
			this.logger.verbose('RUNNER', `Starting task: "${task.module.name}".`);
			task.job.start();
		});
	}

	public async stop(): Promise<void> {

		// Set the status to running.
		this.running = false;

		// Loop tasks and stop them.
		this.tasks.forEach(task => {
			this.logger.verbose('RUNNER', `Stopping task: "${task.module.name}".`);
			task.job.stop();
		});
	}

	public isRunning(): boolean {
		return this.running;
	}
}
