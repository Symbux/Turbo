import { DecoratorHelper } from '../helper/decorator';

/**
 * Defines a service which applies metadata to the class so that
 * on registration, it can process that data, please provide a
 * unique plugin name for the service, this allows for middlewares
 * to be registered globally.
 *
 * @param plugin Unique name for service.
 * @returns ClassDecorator
 */
export function Service(plugin: string): ClassDecorator {
	return (target: any): void => {
		DecoratorHelper.setClassBase(target, 'service');
		Reflect.defineMetadata('t:plugin', plugin, target);
	};
}
