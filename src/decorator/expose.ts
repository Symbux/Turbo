import { DecoratorHelper } from '../helper/decorator';

/**
 * This decorator will mark a method from within a fibre class
 * as exposed and make it available via threading.
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
