import { resolve } from 'path';
import { Engine, HttpPlugin } from '../src';

// Initialise engine instance.
const engine = new Engine({
	autowire: true,
	basepath: resolve(process.cwd(), './demo'),
});

// Use the http plugin.
engine.use(new HttpPlugin({
	port: 3000,
}));

// Start engine.
engine.start().catch((err) => {
	console.error(err);
});
