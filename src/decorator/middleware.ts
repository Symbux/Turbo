import { DecoratorHelper } from '../helper/decorator';

/**
 * This decorator is used against a controller class to be run for any
 * route method inside of the controller.
 * 
 * @param name Name of your middleware.
 * @returns Function
 */
export function Middleware(name: string): ClassDecorator {
	return (target: any): void => {

		// Define the base class information.
		DecoratorHelper.setClassBase(target, 'middleware');
		Reflect.defineMetadata('t:name', name || target.constructor.name, target);
	};
}
