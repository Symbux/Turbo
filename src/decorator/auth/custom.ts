import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator adds an auth check to a controller's method, that
 * allows you to pass a custom check.
 *
 * Custom Function Syntax:
 *   (auth: Record<string, any>) => boolean
 *
 * @param check The custom function.
 * @returns MethodDecorator
 */
export function Custom(check: (auth: Record<string, any>) => boolean): MethodDecorator {
	return (target: any, propertyKey?: symbol | string): void => {

		// Define the auth checks.
		const authChecks = DecoratorHelper.getMetadata('t:auth:checks', [], target, propertyKey);

		// Add an auth check.
		authChecks.push({
			func: check,
			type: 'Custom',
		});

		// Save the auth checks.
		DecoratorHelper.setMetadata('t:auth:checks', authChecks, target, propertyKey);
	};
}
