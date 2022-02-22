import { DecoratorHelper } from '../../helper/decorator';

/**
 * Defines a class as an event listener, which will allow this class to be
 * registered and managed by the EventManager, method decorators are added
 * to each method to allow each listening to events.
 *
 * @returns ClassDecorator
 */
export function Listener(): ClassDecorator {
	return (target: any): void => {
		DecoratorHelper.setClassBase(target, 'event');
		if (!Reflect.hasMetadata('t:events', target)) Reflect.defineMetadata('t:events', [], target);
	};
}
