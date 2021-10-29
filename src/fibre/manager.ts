import { FibreItem, FibreOptions, FibreResponse, FibreThread } from '../interface/structures';
import { spawn, Thread, Worker } from 'threads';
import { ILogger } from '../interface/implements';
import { Inject } from '@symbux/injector';

/**
 * The FibreManager class is a static class that is used to manage the
 * fibres, this can be imported and used in various contexts, including
 * running fibres on-demand.
 *
 * @class FibreManager
 * @injects logger
 * @static
 */
export class FibreManager {
	private static fibres: Map<string, FibreItem> = new Map();
	private static baseOptions: FibreOptions = { warmup: false, expiry: 5 };
	private static interval: NodeJS.Timer;
	@Inject('logger') private static logger: ILogger;

	/**
	 * Will check whether a fibre exists with the given class name.
	 *
	 * @param targetName The fibre class name.
	 * @returns boolean.
	 * @static
	 * @public
	 */
	public static hasFibre(targetName: string): boolean {
		return this.fibres.has(targetName);
	}

	/**
	 * This method creates a new fibre and saves it to the local map.
	 *
	 * @param targetName The fibre class name.
	 * @param name The user defined name.
	 * @param path The path to the fibre class.
	 * @param methods Array of exposed methods.
	 * @param options Any options for the fibre.
	 * @returns Promise<void>
	 * @static
	 * @async
	 * @public
	 */
	public static async createFibre(targetName: string, name: string, path: string, methods: string[], options?: FibreOptions): Promise<void> {

		// Log the creation of a new fibre.
		this.logger.verbose('FIBRE', `Creating new fibre for ${targetName}, user-defined name: ${name}, with path: ${path}, and given options: ${JSON.stringify(options)}.`);

		// Define a new fibre item.
		const fibreItem: FibreItem = {
			name: name,
			path: path,
			options: Object.assign(this.baseOptions, options),
			created: new Date().valueOf(),
			lastUsed: new Date().valueOf(),
			thread: undefined,
			methods: methods,
		};

		// Spawn a new thread.
		fibreItem.thread = await this.spawnThread(fibreItem.options, fibreItem.path);

		// Set the fibre item.
		this.fibres.set(targetName, fibreItem);

		// Log the successful creation of the fibre.
		this.logger.verbose('FIBRE', `Successfully created fibre for ${targetName}.`);
	}

	/**
	 * This method will attempt to execute a fibre, and return the result.
	 *
	 * @param targetName The fibre class name.
	 * @param method The method to call.
	 * @param args Array of arguments to pass to the method.
	 * @returns FibreResponse.
	 * @async
	 * @static
	 * @public
	 */
	public static async runFibre(targetName: string, method: string, args: Array<any>): Promise<FibreResponse> {

		// Note execution.
		const startMs = new Date().valueOf();
		this.logger.verbose('FIBRE', `Executing fibre for ${targetName}, with method: ${method}, and arguments: ${JSON.stringify(args)}.`);

		// Firstly, validate the existence.
		if (!this.fibres.has(targetName)) throw new Error(`Fibre ${targetName} does not exist.`);

		// Get the fibre item.
		const fibreItem = this.fibres.get(targetName);
		if (!fibreItem) throw new Error(`Fibre ${targetName} does not exist.`);

		// Check if method is exposed.
		if (!fibreItem.methods.includes(method)) {
			return {
				status: false,
				error: `Method ${method} is not exposed by fibre ${targetName}.`,
			};
		}

		// Let's check for a valid fibre thread.
		if (!fibreItem?.thread) {
			this.logger.verbose('FIBRE', `Fibre for ${targetName} (thread) does not exist, creating a new one.`);
			fibreItem.thread = await this.spawnThread(fibreItem.options, fibreItem.path);
		}

		// Set the last used time.
		fibreItem.lastUsed = new Date().valueOf();

		// Run the fibre, append running time.
		const output = await fibreItem.thread(false, fibreItem.path, method, args);
		output.executionTime = output.executionTime = new Date().valueOf() - startMs;

		// Return the output.
		return output;
	}

	/**
	 * This method will start the FibreManager service, which does things like
	 * keeping tabs on fibres, and killing them if they go over their expiry time.
	 *
	 * In the future, they will also collect information from the processes, for
	 * like memory usage, current processing request, etc.
	 *
	 * @returns void
	 * @static
	 * @public
	 */
	public static startService(): void {
		this.logger.verbose('FIBRE', 'Starting fibre (clean-up) service.');
		this.interval = setInterval(() => {
			this.logger.verbose('FIBRE', 'Running fibre service.');
			this.runService();
			this.logger.verbose('FIBRE', 'Fibre service finished.');
		}, 1000 * 60);
	}

	/**
	 * This function will loop over available threads, check if the thread is active
	 * and kill them if so, this method is specifically used for either mass-clearing
	 * all threads, and is specifically called on engine shutdown.
	 *
	 * @returns Promise<void>
	 * @static
	 * @async
	 * @public
	 */
	public static async killAll(): Promise<void> {

		// Log the kill.
		this.logger.verbose('FIBRE', 'Killing all fibres.');

		// Define fibre keys.
		const fibreKeys = Array.from(this.fibres.keys());

		// Loop fibre keys.
		for await (const fibreName of fibreKeys) {

			// Get the fibre item.
			const fibreItem = this.fibres.get(fibreName);
			if (!fibreItem) continue;

			// Kill the fibre.
			this.logger.verbose('FIBRE', `Killing fibre: ${fibreName}.`);
			if (fibreItem.thread) await Thread.terminate(fibreItem.thread as Thread);
		}

		// Clear fibres map.
		this.fibres.clear();
	}

	/**
	 * The actual fibre service, this will check for fibres that have gone over
	 * their expiry time, and kill them if they have.
	 *
	 * @returns Promise<void>
	 * @async
	 * @static
	 * @private
	 */
	private static async runService(): Promise<void> {

		// Get the fibre keys.
		const fibreKeys = Array.from(this.fibres.keys());

		// Loop through the fibres.
		for (const fibreKey of fibreKeys) {

			// Get the fibre item.
			const fibreItem = this.fibres.get(fibreKey);
			if (!fibreItem) continue;

			// Check if the fibre has expiry enabled.
			if (!fibreItem.options.expiry || fibreItem.options.expiry === 0) continue;

			// Check if the fibre's thread has already been removed.
			if (!fibreItem.thread) continue;

			// Define expiry amounts.
			const differenceMs = new Date().valueOf() - fibreItem.lastUsed;
			const allowedDifferenceMs = 1000 * 60 * fibreItem.options.expiry;

			// Check if the fibre has expired.
			if (differenceMs > allowedDifferenceMs) {

				// Log the fibre expiry.
				this.logger.verbose('FIBRE', `Fibre ${fibreKey} has expired, terminating thread.`);

				// Terminate the fibre thread.
				Thread.terminate(fibreItem.thread as Thread);
				fibreItem.thread = undefined;
				fibreItem.created = -1;
				fibreItem.lastUsed = -1;

				// Set the fibre.
				this.fibres.set(fibreKey, fibreItem);
			}
		}
	}

	/**
	 * This method will spawn a new thread, and if warmThread is true, will
	 * also run the fibre in warm mode to prepare it and force it to local cache.
	 *
	 * @param options The options to use.
	 * @param path The path to the fibre class.
	 * @returns FibreThread.
	 * @static
	 * @async
	 * @private
	 */
	private static async spawnThread(options: FibreOptions, path: string): Promise<FibreThread> {

		// Log creation of thread.
		this.logger.verbose('FIBRE', `Spawning new fibre with path: ${path}.`);

		// Create a worker thread.
		const thread: FibreThread = await spawn(new Worker('./base'));

		// Check settings for warm thread.
		if (options.warmup) {
			this.logger.verbose('FIBRE', 'Thread warming is enabled, warming thread.');
			await thread(true, path, '', []);
		}

		// Return the thread.
		return thread;
	}
}
