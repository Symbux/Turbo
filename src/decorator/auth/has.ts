import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator adds an auth check to a controller's method, that
 * checks if a property from the authenticated data is set.
 *
 * @param property The property to match.
 * @returns MethodDecorator
 */
export function Has(property: string): MethodDecorator {
	return (target: any, propertyKey?: symbol | string): void => {

		// Define the auth checks.
		const authChecks = DecoratorHelper.getMetadata('t:auth:checks', [], target, propertyKey);

		// Add an auth check.
		authChecks.push({
			func: (auth: Record<string, any>) => typeof auth[property] !== 'undefined',
			type: 'Has',
		});

		// Save the auth checks.
		DecoratorHelper.setMetadata('t:auth:checks', authChecks, target, propertyKey);
	};
}
