import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator is used to mark a class or method as
 * requiring authentication with a property present.
 * 
 * @param property The property to match.
 * @returns MethodDecorator
 */
export function Has(property: string): MethodDecorator {
	return (target: any, propertyKey?: symbol | string): void => {

		// Define the auth checks.
		const authChecks = DecoratorHelper.getMetadata('t:auth', [], target, propertyKey);

		// Add an auth check.
		authChecks.push((auth: any) => typeof auth[property] !== 'undefined');

		// Save the auth checks.
		DecoratorHelper.setMetadata('t:auth', authChecks, target, propertyKey);
	};
}
