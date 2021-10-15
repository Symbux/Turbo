import { DecoratorHelper } from '../helper/decorator';

/**
 * This decorator is used to define a class as a engine task.
 * Tasks can be used to run misc jobs that are not directly related
 * or for the odd job of cleanup.
 * 
 * @param name The name of this task.
 * @param schedule The cron-style schedule to run this task.
 * @returns Function
 */
export function Task(name: string, schedule: string): ClassDecorator {
	return (target: any): void => {
		DecoratorHelper.setClassBase(target, 'task');
		DecoratorHelper.setMetadata('t:task:name', name, target);
		DecoratorHelper.setMetadata('t:task:schedule', schedule, target);
	};
}
