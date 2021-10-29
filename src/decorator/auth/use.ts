import { DecoratorHelper } from '../../helper/decorator';
import { IGenericMiddleware, Constructor } from '../../interface/implements';

/**
 * This decorator will apply middleware to the given class, or method. It expects
 * a middleware class (not an instance), the class is initialised on each request.
 *
 * @param middleware The middleware class to use.
 * @returns ClassDecorator
 */
export function Use(middleware: Constructor<IGenericMiddleware>): ClassDecorator {
	return (target: any): void => {

		// Define the middlewares list.
		const middlewares: Constructor<IGenericMiddleware>[] = DecoratorHelper.getMetadata('t:auth:middleware', [], target);

		// Now add the middleware to the list.
		middlewares.push(middleware);

		// Assign the new middleware list.
		DecoratorHelper.setMetadata('t:auth:middleware', middlewares, target);
	};
}
