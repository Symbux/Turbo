import { DecoratorHelper } from '../../helper/decorator';

/**
 * Defines a method as an endpoint for the HTTP GET method.
 *
 * @param path The endpoint path.
 * @returns MethodDecorator
 * @plugin Http
 */
export function Get(path: string): MethodDecorator {
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
export function Post(path: string): MethodDecorator {
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
export function Patch(path: string): MethodDecorator {
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
export function Put(path: string): MethodDecorator {
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
export function Delete(path: string): MethodDecorator {
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
export function Options(path: string): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'OPTIONS',
			'path': path,
			'auth': {},
		});
	};
}
