import { DecoratorHelper } from '../../helper/decorator';

/**
 * Defines a method as an action that can be called via the WebSocket, uses
 * the name of the method name as the action name.
 *
 * @returns MethodDecorator
 * @plugin Ws
 */
export function Action(): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'path': propertyKey,
			'auth': {},
		});
	};
}
