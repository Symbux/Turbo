import { Registry } from '..';
import { DecoratorHelper } from '../helper/decorator';
import { FibreOptions } from '../interface/structures';
import { FibreManager } from '../fibre/manager';

/**
 * Defines a class as a fibre, creating a thread context for it. All
 * methods that have the `@Exposed()` decorator on them will be proxied
 * through to a specific thread, and all other methods will be called
 * normally. A fibre allows you to run CPU heavy tasks in a separate
 * thread, but be aware that a fibre does not share a context with the
 * main thread, meaning you can't access any injections/registry items
 * that are defined by the engine.
 *
 * The decorator expects the following parameters:
 * - name = Used mainly for output logging.
 * - path = Use the `__filename` built in Node constant.
 * - options [Optional] = See available properties.
 *     - warmup: On class import, it will automatically spin up the fibre,
 *               and run it (in warmup mode) to pre-process any internal modules.
 *     - expiry: The time in minutes from the last use before a fibre is
 *               killed, default: 5 minutes [0 = disabled].
 *
 * Notes:
 * - Spinning up a new fibre is expensive everytime you need it can be
 *   time consuming, use the 'warmup' option to pre-spin up fibres, but
 *   be aware that the expiry option will kill unused fibres.
 * - When running dev mode (uses ts-node), each fibre will be JIT compiled,
 *   therefore it will be 5-10x slower than in production (compiled to JS).
 * - A fibre (single class) should take around 40ms to spin up, with dev
 *   mode enabled - this can take up to 3.5 seconds, any imports will add
 *   to this.
 * - Fibres have no context of the engine, therefore using dependecy injection
 *   and accessing the registry is not possible, looking to support this at a
 *   later date.
 * - For safety, you must expose each method you want to use.
 *
 * @param name The name of the fibre.
 * @param path The path of the file that contains the fibre (Use `__filename`).
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
		if (Registry.get('turbo.status') !== 'main') return;

		// Loop the exposed methods.
		const methods: string[] = DecoratorHelper.getMetadata('t:exposed', [], target);
		methods.forEach(method => {

			// Re-define the function.
			target.prototype[method] = async function(...args: any[]) {

				// Create a new fibre if one doesn't exist.
				if (!FibreManager.hasFibre(target.name)) {
					await FibreManager.createFibre(target.name, name, path, methods, options);
				}

				// Now run the fibre.
				return await FibreManager.runFibre(target.name, method, args);
			};
		});

		// Check for warmup, if enabled, spin up the fibre.
		if (options && options.warmup) {
			if (!FibreManager.hasFibre(target.name)) {
				FibreManager.createFibre(target.name, name, path, methods, options);
			}
		}
	};
}
