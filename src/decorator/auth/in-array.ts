import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator is used to mark a class or method as requiring
 * authentication with a property inside of an array.
 *
 * @param property The property to match.
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
