/**
 * The registry module contains the registry for the Turbo engine,
 * containing all the modules and the global objects.
 */
export class Registry {

	public static modules: { [key: string]: Map<string, any> } = {};
	public static register: Map<string, any> = new Map();

	/**
	 * This method will set a key and value to the registry.
	 * 
	 * @param key The key to register.
	 * @param value The value to set.
	 * @param overwrite Whether to allow overwriting an existing.
	 */
	public static set(key: string, value: any, overwrite = false): void {
		const hasKey = this.register.has(key);
		if (hasKey && !overwrite) throw new Error(`Registry key "${key}" already registered`);
		this.register.set(key, value);
	}

	/**
	 * This will attempt to get a key from the registry.
	 * 
	 * @param key The key to get.
	 * @returns The value of the key.
	 */
	public static get(key: string): any {
		if (!this.register.has(key)) throw new Error(`Registry key "${key}" not found`);
		return this.register.get(key);
	}

	/**
	 * This will remove a key from the registry.
	 * 
	 * @param key The key to remove.
	 */
	public static remove(key: string): void {
		if (!this.register.has(key)) throw new Error(`Registry key "${key}" not found`);
		this.register.delete(key);
	}

	/**
	 * This will clear the registry.
	 */
	public static clear(): void {
		this.register.clear();
	}

	/**
	 * This method will set a module to the registry.
	 * 
	 * @param type The type of the module.
	 * @param name The name of the module.
	 * @param value The module to register.
	 * @param overwrite Whether to overwrite any existing.
	 */
	public static setModule(type: string, name: string, value: any, overwrite = false): void {
		if (!this.modules[type]) this.modules[type] = new Map();
		if (this.modules[type].has(name) && !overwrite) throw new Error(`Registry module "${type}/${name}" already registered`);
		this.modules[type].set(name, value);
	}

	/**
	 * This method will get a module from the registry.
	 * 
	 * @param type The type of the module.
	 * @param name The name of the module.
	 * @returns Dynamic module.
	 */
	public static getModule<ModuleType>(type: string, name: string): ModuleType {
		if (!this.modules[type]) throw new Error(`Registry module type "${type}" not found`);
		if (!this.modules[type].has(name)) throw new Error(`Registry module "${type}/${name}" not found`);
		return this.modules[type].get(name) as ModuleType;
	}

	/**
	 * This will remove a module from the registry.
	 * 
	 * @param type The type of the module.
	 * @param name The name of the module.
	 */
	public static removeModule(type: string, name: string): void {
		if (!this.modules[type]) throw new Error(`Registry module type "${type}" not found`);
		if (!this.modules[type].has(name)) throw new Error(`Registry module "${type}/${name}" not found`);
		this.modules[type].delete(name);
	}
}
