import { DecoratorHelper } from '../../helper/decorator';

export function Action(): MethodDecorator {
	return (target: any, propertyKey: symbol | string): void => {
		DecoratorHelper.addMethod(target, propertyKey, {
			'path': propertyKey,
			'auth': {},
		});
	};
}
