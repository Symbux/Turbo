import { DecoratorHelper } from '../helper/decorator';

/**
 * This decorator will mark a method from within a fibre class
 * as exposed so that when you call this method, the getter will
 * be redefined to call the thread instead, any methods exposed
 * will be proxied to the thread, whereas methods not exposed will
 * be called normally (within the same context).
 *
 * Note: You are able to call proxied methods from within the class
 * as well (which will still call the thread), see the demo fibre
 * for an example.
 *
 * @returns MethodDecorator
 */
export function Expose(): MethodDecorator {
	return (target: any, propertyKey?: symbol | string): void => {
		const exposedMethods: Array<string> = DecoratorHelper.getMetadata('t:exposed', [], target.constructor);
		exposedMethods.push(String(propertyKey));
		DecoratorHelper.setMetadata('t:exposed', exposedMethods, target.constructor);
	};
}
