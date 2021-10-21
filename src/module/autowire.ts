import { Engine } from './engine';
import { IOptions } from '../interface/options';
import { resolve } from 'path';
import { sync as glob } from 'glob';
import { Inject } from '@symbux/injector';
import { ILogger } from '../interface/logger';

export class Autowire {

	@Inject('logger') private logger!: ILogger;
	public folders: Array<string> = [];
	public foundFiles: Array<string> = [];

	public constructor(private engine: Engine, private options: Partial<IOptions>) {

		// Define folders to scan for.
		this.folders = [
			'fibre', 'fibres',
			'controller', 'controllers',
			'middleware', 'middlewares',
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

	public async wireup(): Promise<void> {

		// Define base path
		const basePath = this.options.basepath || resolve(process.cwd(), './src');
		this.logger.verbose('AUTOWIRE', `Base path: ${basePath}`);

		// Loop folders and collect files.
		for await (const folder of this.folders) {

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

				// Add file to found files and then register.
				this.foundFiles.push(file);
				this.engine.registerSingle(moduleImport[moduleKeys[0]]);
			}
		}
	}
}
