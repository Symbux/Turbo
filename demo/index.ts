import { resolve } from 'path';
import { Engine, HttpPlugin, WsPlugin } from '../src';

// Initialise engine instance.
const engine = new Engine({
	autowire: true,
	logLevels: ['info', 'warn', 'error', 'verbose', 'debug'],
	translations: {
		default: 'en_GB',
		folder: resolve(__dirname, './translations'),
	},
	basepath: {
		source: resolve(process.cwd(), './demo'),
		compiled: resolve(process.cwd(), './demo'),
	},
});

// Use the http plugin.
engine.use(new HttpPlugin({
	port: 3002,
	static: [{ folder: resolve(__dirname, './public') }],
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
