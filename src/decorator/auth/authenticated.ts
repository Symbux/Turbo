import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator is used to mark a class or method as
 * requiring authentication.
 * 
 * @returns ClassDecorator & MethodDecorator
 */
export function Authenticated(): ClassDecorator & MethodDecorator {
	return (target: any, propertyKey?: symbol | string): void => {

		// Define the config.
		const authConfig = DecoratorHelper.getMetadata('t:auth', {}, target, propertyKey);

		// Set the config.
		authConfig.authenticated = true;

		// Save the config.
		DecoratorHelper.setMetadata('t:auth', authConfig, target, propertyKey);
	};
}
