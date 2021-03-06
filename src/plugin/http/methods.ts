import { Http } from '../..';
import { DecoratorHelper } from '../../helper/decorator';

/**
 * Defines a method as an endpoint for the HTTP GET method.
 *
 * @param path The endpoint path.
 * @returns MethodDecorator
 * @plugin Http
 */
export function Get(path: string | string[]): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'GET',
			'path': path,
			'auth': {},
		});
	};
}

/**
 * Defines a method as an endpoint for the HTTP POST method.
 *
 * @param path The endpoint path.
 * @returns MethodDecorator
 * @plugin Http
 */
export function Post(path: string | string[]): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'POST',
			'path': path,
			'auth': {},
		});
	};
}

/**
 * Defines a method as an endpoint for the HTTP PATCH method.
 *
 * @param path The endpoint path.
 * @returns MethodDecorator
 * @plugin Http
 */
export function Patch(path: string | string[]): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'PATCH',
			'path': path,
			'auth': {},
		});
	};
}

/**
 * Defines a method as an endpoint for the HTTP PUT method.
 *
 * @param path The endpoint path.
 * @returns MethodDecorator
 * @plugin Http
 */
export function Put(path: string | string[]): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'PUT',
			'path': path,
			'auth': {},
		});
	};
}

/**
 * Defines a method as an endpoint for the HTTP DELETE method.
 *
 * @param path The endpoint path.
 * @returns MethodDecorator
 * @plugin Http
 */
export function Delete(path: string | string[]): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'DELETE',
			'path': path,
			'auth': {},
		});
	};
}

/**
 * Defines a method as an endpoint for the HTTP OPTIONS method.
 *
 * @param path The endpoint path.
 * @returns MethodDecorator
 * @plugin Http
 */
export function Options(path: string | string[]): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'OPTIONS',
			'path': path,
			'auth': {},
		});
	};
}

/**
 * Will define a error response if the given method throws an error.
 *
 * @param callback The callback method with the error as a parameter.
 * @returns MethodDecorator
 * @plugin Http
 */
export function Catch(callback: (e: Error) => Http.Response): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.setMetadata('t:http:catch', callback, target, propertyKey);
	};
}
