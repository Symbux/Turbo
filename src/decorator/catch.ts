/**
 * This method wraps any method and any caught errors will then return the
 * failValue method.
 *
 * @returns Function
 */
export function Catch(failValue: any): MethodDecorator {
	return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
		const originalMethod = descriptor.value;
		descriptor.value = function(...args: Array<any>) {
			try {
				return originalMethod.apply(this, args);
			} catch(err) {
				return failValue;
			}
		};
	};
}
