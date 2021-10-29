import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator is used to define a class as a HTTP controller, this
 * will define settings for the http service to use.
 *
 * @param path The base http path of this controller.
 * @returns ClassDecorator
 * @plugin Http
 */
export function Controller(path: string): ClassDecorator {
	return (target: any): void => {
		DecoratorHelper.setClassBase(target, 'controller');
		Reflect.defineMetadata('t:plugin', 'http', target);
		Reflect.defineMetadata('t:http:path', path, target);
		if (!Reflect.hasMetadata('t:methods', target)) Reflect.defineMetadata('t:methods', [], target);
	};
}
