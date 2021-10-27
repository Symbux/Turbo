import { FibreItem, FibreOptions, FibreResponse, FibreThread } from '../interface/fibre';
import { spawn, Thread, Worker } from 'threads';
import { ILogger } from '../interface/logger';
import { Inject } from '@symbux/injector';

export class FibreManager {
	private static fibres: Map<string, FibreItem> = new Map();
	private static baseOptions: FibreOptions = { warmThread: false };
	private static interval: NodeJS.Timer;
	@Inject('logger') private static logger: ILogger;

	/**
	 * Will check whether a fibre exists with the given class name.
	 *
	 * @param targetName The fibre class name.
	 * @returns boolean.
	 */
	public static hasFibre(targetName: string): boolean {
		return this.fibres.has(targetName);
	}

	/**
	 * This method creates a new fibre and saves it to the local map.
	 *
	 * @param targetName The fibre class name.
	 * @param name The user defined name.
	 * @param mode The mode of the fibre (thread = single instance, pool = multi instance).
	 * @param path The path to the fibre class.
	 * @param options Any options for the fibre.
	 */
	public static async createFibre(targetName: string, name: string, path: string, options?: FibreOptions): Promise<void> {

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
	 * @param args The arguments to pass to the method.
	 * @returns FibreResponse.
	 */
	public static async runFibre(targetName: string, method: string, args: Array<any>): Promise<FibreResponse> {

		// Note execution.
		this.logger.verbose('FIBRE', `Executing fibre for ${targetName}, with method: ${method}, and arguments: ${JSON.stringify(args)}.`);

		// Firstly, validate the existence.
		if (!this.fibres.has(targetName)) throw new Error(`Fibre ${targetName} does not exist.`);

		// Get the fibre item.
		const fibreItem = this.fibres.get(targetName);
		if (!fibreItem) throw new Error(`Fibre ${targetName} does not exist.`);

		// Let's check for a valid fibre thread.
		if (!fibreItem?.thread) {
			this.logger.verbose('FIBRE', `Fibre for ${targetName} (thread) does not exist, creating a new one.`);
			fibreItem.thread = await this.spawnThread(fibreItem.options, fibreItem.path);
		}

		// Set the last used time.
		fibreItem.lastUsed = new Date().valueOf();

		// Run the fibre.
		return await fibreItem.thread(false, fibreItem.path, method, args);
	}

	/**
	 * This method will start the FibreManager service, which keeps the fibres
	 * clean preventing rogue processes, and removing existing processes.
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
	 * This method will kill all fibres, and remove them from the map.
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
	 * This method is an internal process that does all of the thread cleanup
	 * and removal of old threads.
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
			if (!fibreItem.options.threadExpiry || fibreItem.options.threadExpiry === 0) continue;

			// Check if the fibre's thread has already been removed.
			if (!fibreItem.thread) continue;

			// Define expiry amounts.
			const differenceMs = new Date().valueOf() - fibreItem.lastUsed;
			const allowedDifferenceMs = 1000 * 60 * fibreItem.options.threadExpiry;

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
	 */
	private static async spawnThread(options: FibreOptions, path: string): Promise<FibreThread> {

		// Log creation of thread.
		this.logger.verbose('FIBRE', `Spawning new thread for fibre with path: ${path}.`);

		// Create a worker thread.
		const thread: FibreThread = await spawn(new Worker('./base'));

		// Check settings for warm thread.
		if (options.warmThread) {
			this.logger.verbose('FIBRE', 'Thread warming is enabled, warming thread.');
			await thread(true, path, '', []);
		}

		// Return the thread.
		return thread;
	}
}
