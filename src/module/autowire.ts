import { Engine } from './engine';
import { IOptions } from '../interface/structures';
import { resolve } from 'path';
import { sync as glob } from 'glob';
import { Inject, Injector } from '@symbux/injector';
import { ILogger } from '../interface/implements';
import { DecoratorHelper } from '../helper/decorator';
import { Registry } from './registry';

/**
 * The autowire module is loaded if autowiring is enabled within the engine,
 * this module is responsible for autowiring the engine with the modules by
 * scanning directories for modules and calling the engine to register them.
 *
 * By default autowiring does not allow configuration, you can add optional
 * configuration by using the `@Options` decorator.
 *
 * @class Autowire
 * @provides Autowire {engine.autowire}
 * @injects logger
 */
export class Autowire {

	@Inject('logger') private logger!: ILogger;
	public folders: Array<string> = [];
	public foundFiles: Array<string> = [];

	/**
	 * Creates an instance of the autowire module.
	 *
	 * @param engine The engine instance.
	 * @param options The engine's options.
	 * @constructor
	 */
	public constructor(private engine: Engine, private options: Partial<IOptions>) {

		// Register self.
		Injector.register('engine.autowire', this);

		// Define folders to scan for.
		this.folders = [
			'fibre', 'fibres',
			'controller', 'controllers',
			'provider', 'providers',
			'task', 'tasks',
			'service', 'services',
			'model', 'models',
			'entity', 'entites',
		];

		// Add additional folders.
		if (this.options.folders) {
			this.folders = this.folders.concat(this.options.folders);
		}

		// If autowire is enabled, count registered folders.
		if (this.options.autowire) {
			this.logger.verbose('AUTOWIRE', `${this.folders.length} folders registered.`);
		}
	}

	/**
	 * The actual async method that is called that will scan the folders
	 * and wireup all of the modules.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async wireup(): Promise<void> {

		// Define base path.
		let basePath: string;

		// Check for modes and source.
		if (this.options.basepath) {
			if (Registry.get('engine.mode') === 'production') {
				basePath = resolve(process.cwd(), this.options.basepath.compiled);
			} else {
				basePath = resolve(process.cwd(), this.options.basepath.source);
			}
		} else {
			if (Registry.get('engine.mode') === 'production') {
				basePath = resolve(process.cwd(), './dist');
			} else {
				basePath = resolve(process.cwd(), './src');
			}
		}

		// Note the base path.
		this.logger.verbose('AUTOWIRE', `Base path: ${basePath}`);

		// Scan for all files.
		const foldersToScan = this.options.scanFoldersOnly ? this.folders : ['.'];

		// Loop folders and collect files.
		for await (const folder of foldersToScan) {

			// Log folder.
			this.logger.verbose('AUTOWIRE', `Scanning folder: ${resolve(basePath, `./${folder}`)}`);

			// Define the folder path.
			const folderPath = resolve(basePath, `./${folder}`);
			const files = glob(`${folderPath}/**/*{.ts,.js}`);

			// Loop files and add to found files and import.
			for await (const file of files) {

				// Log import file.
				this.logger.verbose('AUTOWIRE', `Registering file: ${resolve(basePath, folder, file)}`);

				// Import file and load keys.
				const moduleImport = await import(resolve(basePath, folder, file));
				const moduleKeys = Object.keys(moduleImport);

				// If no module exports, continue.
				if (moduleKeys.length === 0) continue;

				// Add file to found files and then register.
				this.foundFiles.push(file);

				// Check if it is an engine import.
				const isEngineModule = DecoratorHelper.getMetadata('engine:module', 0, moduleImport[moduleKeys[0]]);
				if (isEngineModule === 1) {

					// Get any decorator based options.
					const options = DecoratorHelper.getMetadata('t:options', {}, moduleImport[moduleKeys[0]]);
					this.engine.registerSingle(moduleImport[moduleKeys[0]], options || undefined);
				}
			}
		}
	}
}
