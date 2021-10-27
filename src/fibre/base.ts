import 'reflect-metadata';
import { expose } from 'threads/worker';

// Define the cached module.
let fibreModule: any = false;

expose(async (warmup: boolean, path: string, method: string, params: any[]) => {
	try {

		// Import the module and cache it.
		if (!fibreModule) {
			const moduleImport = await import(path);
			const moduleKeys = Object.keys(moduleImport);
			fibreModule = new moduleImport[moduleKeys[0]]();
		}

		// Check for warmup.
		if (warmup) return { status: true, warmup: true };

		// Now execute the method.
		const output = await fibreModule[method](...params);

		// Return the data.
		return {
			status: true,
			data: output,
		};

	} catch(error) {

		// Return false with error message.
		return {
			status: false,
			error: (error as Error).message,
		};
	}
});
