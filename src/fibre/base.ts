import 'reflect-metadata';
import { expose } from 'threads/worker';

// Define the cached module.
let module: any = false;

expose(async (warmup: boolean, path: string, method: string, params: any[]) => {
	try {

		// Define start time.
		const startMs = new Date().valueOf();

		// Import the module and cache it.
		if (!module) {
			const moduleImport = await import(path);
			const moduleKeys = Object.keys(moduleImport);
			module = new moduleImport[moduleKeys[0]]();
		}

		// Check for warmup.
		if (warmup) return { status: true, warmup: true };

		// Now execute the method.
		const output = await module[method](...params);

		// Return the data.
		return {
			status: true,
			data: output,
			executionTime: (new Date().valueOf() - startMs),
		};

	} catch(error) {

		// Return false with error message.
		return {
			status: false,
			error: (error as Error).message,
		};
	}
});
