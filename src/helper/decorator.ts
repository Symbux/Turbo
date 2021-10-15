export class DecoratorHelper {

	/**
	 * This method returns the metadata for the provided target and
	 * optionally the property if given.
	 * 
	 * @param key The metadata key
	 * @param fallback The fallback value
	 * @param target The decorator target
	 * @param propertyKey The decorator property key
	 * @returns any
	 */
	public static getMetadata(key: string, fallback: any, target: any, propertyKey?: string | symbol): any {
		if (propertyKey) {
			return Reflect.getMetadata(key, target, propertyKey) || fallback;
		} else {
			return Reflect.getMetadata(key, target) || fallback;
		}
	}

	/**
	 * This method will set the metadata for the provided target and
	 * optionally the property if given.
	 * 
	 * @param key The metadata key
	 * @param value The metadata value
	 * @param target The decorator target
	 * @param propertyKey The decorator property key
	 * @returns void
	 */
	public static setMetadata(key: string, value: any, target: any, propertyKey?: string | symbol): void {
		if (propertyKey) {
			Reflect.defineMetadata(key, value, target, propertyKey);
		} else {
			Reflect.defineMetadata(key, value, target);
		}
	}

	/**
	 * This method will define the base module information, like the
	 * name and module type.
	 * 
	 * @param target The decorator target.
	 * @param moduleType The module type.
	 */
	public static setClassBase(target: any, moduleType: string): void {
		Reflect.defineMetadata('t:name', target.name, target);
		Reflect.defineMetadata('t:type', moduleType, target);
	}

	/**
	 * This will add a method to the target.
	 * 
	 * @param target The decorator target.
	 * @param propertyKey The method to add.
	 * @param data The data to add.
	 */
	public static addMethod(target: any, propertyKey: string | symbol, data: Record<string, any>): void {
		const methods = this.getMetadata('t:methods', {}, target);
		methods[propertyKey] = data;
		this.setMetadata('t:methods', methods, target);
	}

	/**
	 * This will update the method data for the given target and property key.
	 * 
	 * @param target The decorator target.
	 * @param propertyKey The property key.
	 * @param data The data to add.
	 */
	public static updateMethod(target: any, propertyKey: string | symbol, data: Record<string, any>): void {
		const methods = this.getMetadata('t:methods', {}, target);
		methods[propertyKey] = Object.assign(methods[propertyKey], data);
		this.setMetadata('t:methods', methods, target);
	}
}
