import { Registry } from '..';
import { DecoratorHelper } from '../helper/decorator';
import { FibreOptions } from '../interface/fibre';
import { FibreManager } from '../fibre/manager';

/**
 * The fibre decorator is used against a class to define it as an
 * fibre and apply the configurations. You will also need to expose the
 * methods that you want to be available this is for the engine to
 * create getters against the fibre method. See notes below.
 *
 * The decorator expects the following parameters:
 * - name = Used mainly for output logging.
 * - options [Optional] = See available properties.
 *     - keepWarm: Whether to keep the thread alive, or kill it after the task is complete, default: false (only used in 'thread' mode).
 *     - threadExpiry: The time in minutes from the last use before a thread is killed, default: 0 [disabled] (only used in 'thread' mode).
 *
 * Notes:
 * - Spinning up a thread usually takes under 40ms, but can take longer if the task has lots of imports (in dev mode, it has to be JIT compiled).
 * - Threads have no context of the engine, so do not try and inject properties, or access the registry which is not setup inside of the fibre.
 * - Also note that a fibre is the whole class, not just the method, meaning you can call the other class methods from your exposed method.
 *
 * @param name The name of the fibre.
 * @param options The options for the fibre.
 * @returns ClassDecorator
 */
export function Fibre(name: string, path: string, options?: FibreOptions): ClassDecorator {
	return (target: any): void => {

		// Define the base class information.
		DecoratorHelper.setClassBase(target, 'fibre');
		DecoratorHelper.setMetadata('t:name', name || target.name, target);
		DecoratorHelper.setMetadata('t:options', options, target);

		// Check if main process.
		if (Registry.get('engine.status') !== 'main') return;

		// Loop the exposed methods.
		const methods: string[] = DecoratorHelper.getMetadata('t:exposed', [], target);
		methods.forEach(method => {

			// Re-define the function.
			target.prototype[method] = async function(...args: any[]) {

				// Create a new fibre if one doesn't exist.
				if (!FibreManager.hasFibre(target.name)) {
					await FibreManager.createFibre(target.name, name, path, options);
				}

				// Now run the fibre.
				return await FibreManager.runFibre(target.name, method, args);
			};
		});
	};
}
