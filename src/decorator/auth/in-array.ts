import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator adds an auth check to a controller's method, that
 * checks if a property contains a specific value.
 *
 * Note: For arrays only, calls `.includes()` on the property.
 *
 * @param property The property to look at.
 * @param expected The value to expect.
 * @returns MethodDecorator
 */
export function InArray(property: string, expected: any): MethodDecorator {
	return (target: any, propertyKey?: symbol | string): void => {

		// Define the auth checks.
		const authChecks = DecoratorHelper.getMetadata('t:auth:checks', [], target, propertyKey);

		// Add an auth check.
		authChecks.push({
			func: (auth: Record<string, any>) => {
				if (!Array.isArray(auth[property])) return false;
				if (!auth[property].includes(expected)) return false;
				return true;
			},
			type: 'InArray',
		});

		// Save the auth checks.
		DecoratorHelper.setMetadata('t:auth:checks', authChecks, target, propertyKey);
	};
}
