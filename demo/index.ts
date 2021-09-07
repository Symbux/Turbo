import { Engine, HttpPlugin } from '../src';

// Initialise engine instance.
const engine = new Engine({
	autowire: true,
});

// Use the http plugin.
engine.use(new HttpPlugin({
	port: 8080,
}));

// Start engine.
engine.start().catch((err) => {
	console.error(err);
});
