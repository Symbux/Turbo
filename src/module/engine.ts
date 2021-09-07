import { IKeyValue } from '../interface/generic';
import { IOptions } from '../interface/options';
import { IPlugin } from '../interface/plugin';
import { Services } from './services';

/**
 * The engine class is the main class of the application.
 * It is responsible for starting the server and listening to the port.
 * It also handles the autowiring of the modules.
 * 
 * @class Engine
 */
export class Engine {

	private services: Services;

	/**
	 * Creates a new instance of the Turbo engine and initialises
	 * all required modules.
	 * 
	 * @param options Turbo options.
	 */
	public constructor(private options: Partial<IOptions>) {
		this.services = new Services();
	}

	/**
	 * Accepts a plugin and then will register it internally.
	 * 
	 * @param plugin The plugin to be added.
	 */
	public use(plugin: IPlugin): void {
		plugin.install(this);
	}

	/**
	 * Registers a module to the engine.
	 * 
	 * @param module The module to be registered.
	 * @returns void
	 */
	public register(module: any, options: IKeyValue): void {
		// this.registerModule(service);
	}

	/**
	 * Starts the Turbo engine.
	 */
	public async start(): Promise<void> {
		// To-do.
	}
}
