import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator is used to mark a class or method as
 * requiring authentication with a given property matching
 * the expected value.
 *
 * @param property The property to match.
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
