import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator is used to mark a class or method as
 * requiring authentication with a property matching the
 * specified value(s).
 * 
 * @param {string} property The property to match.
 * @param {string} value The value to match.
 * @returns MethodDecorator
 */
export function Has(property: string, expected: string | string[]): MethodDecorator {
	return (target: any, propertyKey?: symbol | string): void => {

		// Define the config.
		const authConfig = DecoratorHelper.getMetadata('t:auth', {}, target, propertyKey);

		// Set the config.
		if (!authConfig.has) authConfig.has = {};
		authConfig.has[property] = expected;

		// Save the config.
		DecoratorHelper.setMetadata('t:auth', authConfig, target, propertyKey);
	};
}
