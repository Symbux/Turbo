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
}