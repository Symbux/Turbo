import { DecoratorHelper } from '../helper/decorator';

/**
 *
 *
 * @param options Options object to define against the class.
 * @returns ClassDecorator
 */
export function Service(options: Record<string, any>): ClassDecorator {
	return (target: any): void => {
		DecoratorHelper.setMetadata('t:options', options, target);
	};
}
