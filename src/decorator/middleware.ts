import { DecoratorHelper } from '../helper/decorator';

/**
 * Defines a class as a decorator, will apply specific metadata so that when initialised
 * it can call that data, including options.
 *
 * @param name Name of your middleware.
 * @param options Options for your middleware.
 * @param serviceId Optional service identifier or true for global [default: false].
 * @returns ClassDecorator
 */
export function Middleware(name: string, options?: Record<string, any>, serviceId: boolean | string = false): ClassDecorator {
	return (target: any): void => {

		// Define the base class information.
		DecoratorHelper.setClassBase(target, 'middleware');
		DecoratorHelper.setMetadata('t:name', name || target.constructor.name, target);
		DecoratorHelper.setMetadata('t:global', serviceId, target);
		DecoratorHelper.setMetadata('t:options', options, target);
	};
}
