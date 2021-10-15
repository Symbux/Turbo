import { DecoratorHelper } from '../../helper/decorator';

export function Get(path: string): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'GET',
			'path': path,
			'auth': {},
		});
	};
}

export function Post(path: string): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'POST',
			'path': path,
			'auth': {},
		});
	};
}

export function Patch(path: string): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'PATCH',
			'path': path,
			'auth': {},
		});
	};
}

export function Put(path: string): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'PUT',
			'path': path,
			'auth': {},
		});
	};
}

export function Delete(path: string): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'DELETE',
			'path': path,
			'auth': {},
		});
	};
}

export function Options(path: string): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'method': 'OPTIONS',
			'path': path,
			'auth': {},
		});
	};
}
