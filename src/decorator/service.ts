import { DecoratorHelper } from '../helper/decorator';

/**
 * This decorator is used to define a class as a HTTP controller, this
 * will define settings for the http service to use.
 * 
 * @param path The base http path of this controller.
 * @returns Function
 */
export function Service(plugin: string): ClassDecorator {
	return (target: any): void => {
		DecoratorHelper.setClassBase(target, 'service');
		Reflect.defineMetadata('t:plugin', plugin, target);
	};
}
