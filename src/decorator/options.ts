import { DecoratorHelper } from '../helper/decorator';

/**
 * Used to apply options to a module, when using autowire or array based
 * registration.
 *
 * Usage:
 *   @Options({
 *       someOption: 'someValue'
 *   })
 *
 * @param options Options object to define against the class.
 * @returns ClassDecorator
 */
export function Options(options: Record<string, any>): ClassDecorator {
	return (target: any): void => {
		DecoratorHelper.setMetadata('t:options', options, target);
	};
}
