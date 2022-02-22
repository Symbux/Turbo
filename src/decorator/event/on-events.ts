import { EventType } from '../../interface/structures';
import { DecoratorHelper } from '../../helper/decorator';

/**
 * Defines a method as an event listener for the BeforeInit
 * type, which is executed before the services are loaded.
 *
 * @returns MethodDecorator
 */
export function BeforeInit(shouldWait = false): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'type': EventType.BEFORE_INIT,
			'wait': shouldWait,
		});
	};
}


/**
 * Defines a method as an event listener for the AfterInit
 * type, which is executed after the services are loaded.
 *
 * @returns MethodDecorator
 */
export function AfterInit(shouldWait = false): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'type': EventType.AFTER_INIT,
			'wait': shouldWait,
		});
	};
}

/**
 * Defines a method as an event listener for the BeforeStart
 * type, which is executed before the services are started.
 *
 * @returns MethodDecorator
 */
export function BeforeStart(shouldWait = false): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'type': EventType.BEFORE_START,
			'wait': shouldWait,
		});
	};
}

/**
 * Defines a method as an event listener for the AfterStart
 * type, which is executed after the services are started.
 *
 * @returns MethodDecorator
 */
export function AfterStart(shouldWait = false): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'type': EventType.AFTER_START,
			'wait': shouldWait,
		});
	};
}

/**
 * Defines a method as an event listener for the BeforeStop
 * type, which is executed before the services are stopped.
 *
 * @returns MethodDecorator
 */
export function BeforeStop(shouldWait = false): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'type': EventType.BEFORE_STOP,
			'wait': shouldWait,
		});
	};
}

/**
 * Defines a method as an event listener for the AfterStop
 * type, which is executed after the services are stopped.
 *
 * @returns MethodDecorator
 */
export function AfterStop(shouldWait = false): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'type': EventType.AFTER_STOP,
			'wait': shouldWait,
		});
	};
}
