import { Inject, Injector } from '@symbux/injector';
import { ILogger } from '../interface/implements';
import { Registry } from './registry';
import { CronJob } from 'cron';
import { DecoratorHelper } from '../helper/decorator';
import { durationToHuman } from '../helper/misc';

/**
 * The runner module is in charge of executing the cron-style tasks,
 * including scheduling and calling on-demand.
 *
 * @class Runner
 * @provides Runner {turbo.runner}
 * @injects logger
 */
export class Runner {

	@Inject('logger') private logger!: ILogger;
	private tasks: Array<{ module: any, instance: any, options: any, job: CronJob, name: string }> = [];
	private running = false;

	/**
	 * Creates an instance of the runner module.
	 *
	 * @constructor
	 */
	public constructor() {
		Injector.register('turbo.runner', this);
	}

	/**
	 * Will intialise the runner module, by collecting the tasks, registering their
	 * cron tasks and creating jobs.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
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

	/**
	 * Will start the runner module, by starting the cron jobs.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async start(): Promise<void> {

		// Set the status to running.
		this.running = true;

		// Loop tasks and start them.
		this.tasks.forEach(task => {
			this.logger.verbose('RUNNER', `Starting task: "${task.module.name}".`);
			task.job.start();
		});
	}

	/**
	 * Will stop the runner module, by stopping the cron jobs.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async stop(): Promise<void> {

		// Set the status to running.
		this.running = false;

		// Loop tasks and stop them.
		this.tasks.forEach(task => {
			this.logger.verbose('RUNNER', `Stopping task: "${task.module.name}".`);
			task.job.stop();
		});
	}

	/**
	 * Will return the status of the runner module.
	 *
	 * @returns boolean
	 * @public
	 */
	public isRunning(): boolean {
		return this.running;
	}

	/**
	 * Will lookup tasks for the given name.
	 *
	 * @param name The name of the task.
	 * @returns boolean
	 */
	public hasTask(name: string): boolean {
		const task = this.tasks.find(task => task.name === name);
		if (!task) return false;
		return true;
	}

	/**
	 * Will execute a task for the given name.
	 *
	 * @param name The name of the task.
	 * @returns boolean
	 */
	public async runTask(name: string): Promise<boolean> {
		const task = this.tasks.find(task => task.name === name);
		if (!task) throw new Error(`Could not find task: ${name}.`);
		if (!task.instance || !task.instance.execute) throw new Error(`Task: ${name} is malformed and can't be executed.`);
		return await task.instance.execute();
	}
}
