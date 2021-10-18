import { Provide, Inject } from '@symbux/injector';
import { ILogger } from '../interface/logger';

/**
 * The registry module contains the registry for the Turbo engine,
 * containing all the modules and the global objects.
 */
@Provide('engine.registry')
export class Registry {

	@Inject('logger') private static logger: ILogger;
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
		this.logger.verbose('REGISTRY', `Setting key: "${key}" with value: "${value}" (overwrite: "${overwrite}").`);
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
		this.logger.verbose('REGISTRY', `Removing key: "${key}".`);
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
		this.logger.verbose('REGISTRY', `Setting module: "${name}" of type: "${type}" (overwrite: "${overwrite}").`);
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
	 * This method will get the modules from the registry.
	 *
	 * @param type The type of the module.
	 * @param name The name of the module.
	 * @returns Dynamic module.
	 */
	public static getModules(type: string): Array<any> {
		if (!this.modules[type]) return [];
		return Array.from(this.modules[type].values());
	}

	/**
	 * This will remove a module from the registry.
	 *
	 * @param type The type of the module.
	 * @param name The name of the module.
	 */
	public static removeModule(type: string, name: string): void {
		this.logger.verbose('REGISTRY', `Removing module: "${name}" of type: "${type}".`);
		if (!this.modules[type]) throw new Error(`Registry module type "${type}" not found`);
		if (!this.modules[type].has(name)) throw new Error(`Registry module "${type}/${name}" not found`);
		this.modules[type].delete(name);
	}

	/**
	 * List all modules in the registry.
	 */
	public static listModules(): any {
		const modules = {};
		Object.keys(this.modules).forEach(key => {
			modules[key] = {};
			modules[key] = this.modules[key].entries();
		});
		return modules;
	}
}
