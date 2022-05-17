import { resolve } from 'path';
import { Engine, HttpPlugin, /*ILogger,*/ WsPlugin } from '../src';
import CacheControl from './module/cache';

// class CustomLogger implements ILogger {
// 	public info(...args: any[]): void {
// 		console.log('cl::info', ...args);
// 	}

// 	public warn(...args: any[]): void {
// 		console.warn('cl::warn', ...args);
// 	}

// 	public error(...args: any[]): void {
// 		console.error('cl::error', ...args);
// 	}

// 	public verbose(...args: any[]): void {
// 		console.log('cl::verbose', ...args);
// 	}

// 	public debug(...args: any[]): void {
// 		console.log('cl::debug', ...args);
// 	}
// }

const onErrorHandler = (err: Error) => {
	console.warn(err);
};

// Force an error after 10 seconds.
setTimeout(() => {
	throw new Error('Forced error - testing');
}, 10000);

// Initialise engine instance.
const engine = new Engine({
	autowire: true,
	logLevels: ['info', 'warn', 'error', 'verbose', 'debug'],
	translations: resolve(__dirname, './translations'),
	errors: {
		handler: onErrorHandler,
		continue: true,
	},
	basepath: {
		source: resolve(process.cwd(), './demo'),
		compiled: resolve(process.cwd(), './demo'),
	},
	// logger: new CustomLogger(),
});

// Use the http plugin.
engine.use(new HttpPlugin({
	port: 3002,
	static: [{ folder: resolve(__dirname, './public') }],
	cache: new CacheControl(),
	uploads: {
		enabled: true,
	},
	security: {
		enableHelmet: true,
		disablePoweredBy: true,
		helmetOptions: {
			contentSecurityPolicy: false,
		},
	},
}));

// Use the ws plugin.
engine.use(new WsPlugin({
	path: '/ws',
}));

// Start engine.
engine.start().catch((err) => {
	console.error(err);
});
