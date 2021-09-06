/**
 * This decorator is used to define a class as a HTTP controller, this
 * will define settings for the http service to use.
 * 
 * @param path The base http path of this controller.
 * @returns Function
 */
export function Controller(path: string): ClassDecorator {
	return (target: any): void => {
		Reflect.defineMetadata('t:type', 'controller', target);
		Reflect.defineMetadata('t:plugin', 'http', target);
		Reflect.defineMetadata('t:name', target.name, target);
		Reflect.defineMetadata('t:http:path', path, target);
		if (!Reflect.hasMetadata('t:methods', target)) Reflect.defineMetadata('t:methods', [], target);
	};
}
