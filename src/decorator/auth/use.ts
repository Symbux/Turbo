import { DecoratorHelper } from '../../helper/decorator';

/**
 * This decorator is used to tell the authentication decorators
 * if applied, what middleware method to use.
 * 
 * @param middleware The middleware to use or function.
 * @returns ClassDecorator
 */
export function Use(middleware: string): ClassDecorator {
	return (target: any): void => {
		DecoratorHelper.setMetadata('t:auth:middleware', middleware, target);
	};
}
