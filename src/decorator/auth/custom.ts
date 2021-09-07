import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator is used to mark a class or method as
 * requiring authentication with a custom strategy.
 * 
 * @param {Function} check The custom function.
 * @returns MethodDecorator
 */
export function Custom(check: (auth: any) => boolean): MethodDecorator {
	return (target: any, propertyKey?: symbol | string): void => {

		// Define the auth checks.
		const authChecks = DecoratorHelper.getMetadata('t:auth', [], target, propertyKey);

		// Add an auth check.
		authChecks.push(check);

		// Save the auth checks.
		DecoratorHelper.setMetadata('t:auth', authChecks, target, propertyKey);
	};
}
