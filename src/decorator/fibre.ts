import { Registry } from '..';
import { DecoratorHelper } from '../helper/decorator';
import { FibreMode, FibreOptions, FibreResponse, FibreThread } from '../interface/fibre';
import { FibreManager } from '../fibre/manager';
import { Thread } from 'threads';

/**
 * The fibre decorator is used against a class to define it as an
 * fibre and apply the configurations. You will also need to expose the
 * methods that you want to be available this is for the engine to
 * create getters against the fibre method. See notes below.
 *
 * The decorator expects the following parameters:
 * - name = Used mainly for output logging.
 * - mode = ENUM: thread = runs in a single thread, pool = creates a pool of threads.
 * - options [Optional] = See available properties.
 *     - poolSize: The defined thread count, default: 1 (only used in 'pool' mode).
 *     - keepWarm: Whether to keep the thread alive, or kill it after the task is complete, default: false (only used in 'thread' mode).
 *
 * Notes:
 * - Spinning up a thread usually takes under 40ms, but can take longer if the task has lots of imports (in dev mode, it has to be JIT compiled).
 * - Threads have no context of the engine, so do not try and inject properties, or access the registry which is not setup inside of the fibre.
 * - Also note that a fibre is the whole class, not just the method, meaning you can call the other class methods from your exposed method.
 *
 * @param name The name of the fibre.
 * @param mode The mode of the fibre.
 * @param options The options for the fibre.
 * @returns ClassDecorator
 */
export function Fibre(name: string, mode: FibreMode, path: string, options?: FibreOptions): ClassDecorator {
	return (target: any): void => {

		// Define the base class information.
		DecoratorHelper.setClassBase(target, 'fibre');
		DecoratorHelper.setMetadata('t:name', name || target.constructor.name, target);
		DecoratorHelper.setMetadata('t:mode', mode, target);
		DecoratorHelper.setMetadata('t:options', options, target);

		// Define a cache variable.
		let fibre: FibreThread | null = null;

		// Check if main process.
		if (Registry.get('engine.status') === 'main') {

			// Loop the exposed methods.
			const methods: string[] = DecoratorHelper.getMetadata('t:exposed', [], target);
			methods.forEach(method => {

				// Re-define the function.
				target.prototype[method] = async function(...args: any[]) {

					// Create a new fibre.
					if (!fibre) fibre = await FibreManager.createFibre(path);

					// Run the fibre.
					const output: FibreResponse = await fibre(path, method, args);

					// Check whether to keep the thread alive.
					if (!options || !options.keepWarm) {
						await Thread.terminate((fibre as any));
						fibre = null;
					}

					// Return the output.
					if (output.status) {
						return output;
					} else {
						console.error(output.error);
						return false;
					}
				};
			});
		}
	};
}