import { Registry } from '..';
import { DecoratorHelper } from '../helper/decorator';
import { FibreOptions } from '../interface/fibre';
import { FibreManager } from '../fibre/manager';

/**
 * The fibre decorator is used against a class to define it as an
 * fibre and apply the configurations on import, please note, all
 * methods should be async. All methods defined in the class will
 * be exposed automatically.
 *
 * The decorator expects the following parameters:
 * - name = Used mainly for output logging.
 * - path = Use the `__filename` built in Node constant.
 * - options [Optional] = See available properties.
 *     - warmup: On class import, it will automatically spin up the fibre, and run it (in warmup mode) to pre-process any internal modules.
 *     - expiry: The time in minutes from the last use before a fibre is killed, default: 5 minutes [0 = disabled]
 *
 * Notes:
 * - Spinning up a new fibre is expensive everytime you need it can be time consuming, use the 'warmup' option to pre-spin up fibres.
 * - When running dev mode (uses ts-node), each fibre will be JIT compiled, therefore it will be 5-10x slower than in production (compiled to JS).
 * - A fibre (single class) should take around 40ms to spin up, with dev mode enabled - this can take up to 3.5 seconds, any imports will add to this.
 * - Fibres have no context of the engine, therefore using dependecy injection and accessing the registry is not possible, looking to support this at a later date.
 * - For safety, you must expose each method you want to use.
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
