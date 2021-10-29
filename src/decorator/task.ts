import { DecoratorHelper } from '../helper/decorator';

/**
 * This decorator defines a class as a task item, and will register it
 * accordingly, tasks are cron-based jobs that can be executed by the
 * engine where you can schedule clean-up tasks, or run things at specific
 * times.
 *
 * @param name The name of this task.
 * @param schedule The cron-style schedule to run this task.
 * @returns ClassDecorator
 */
export function Task(name: string, schedule: string): ClassDecorator {
	return (target: any): void => {
		DecoratorHelper.setClassBase(target, 'task');
		DecoratorHelper.setMetadata('t:task:name', name, target);
		DecoratorHelper.setMetadata('t:task:schedule', schedule, target);
	};
}
