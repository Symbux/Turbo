import { resolve } from 'path';
import { Engine, HttpPlugin, WsPlugin } from '../src';

// Initialise engine instance.
const engine = new Engine({
	autowire: true,
	basepath: resolve(process.cwd(), './demo'),
});

// Use the http plugin.
engine.use(new HttpPlugin({
	port: 3000,
}));

// Use the ws plugin.
engine.use(new WsPlugin({
	path: '/ws',
	port: 3000,
}));

// Start engine.
engine.start().catch((err) => {
	console.error(err);
});
