import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator adds an auth check to a controller's method, that
 * checks if a property from the authenticated data is a specific value.
 *
 * @param property The property to check.
 * @param expected The expected value to match.
 * @returns MethodDecorator
 */
export function Is(property: string, expected: any): MethodDecorator {
	return (target: any, propertyKey?: symbol | string): void => {

		// Define the auth checks.
		const authChecks = DecoratorHelper.getMetadata('t:auth:checks', [], target, propertyKey);

		// Add an auth check.
		authChecks.push({
			func: (auth: Record<string, any>) => auth[property] === expected,
			type: 'Is',
		});

		// Save the auth checks.
		DecoratorHelper.setMetadata('t:auth:checks', authChecks, target, propertyKey);
	};
}
