import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator is used to define a class as a HTTP controller, this
 * will define settings for the http service to use.
 *
 * @param namespace The namespace to use when sending websocket messages to the server.
 * @returns Function
 */
export function Controller(namespace: string): ClassDecorator {
	return (target: any): void => {
		DecoratorHelper.setClassBase(target, 'controller');
		Reflect.defineMetadata('t:plugin', 'ws', target);
		Reflect.defineMetadata('t:ws:namespace', namespace, target);
		if (!Reflect.hasMetadata('t:methods', target)) Reflect.defineMetadata('t:methods', [], target);
	};
}
