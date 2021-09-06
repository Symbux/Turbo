import { Engine, HttpPlugin } from '../src';

// Initialise engine instance.
const engine = new Engine({
	autowire: true,
	port: 8080,
});

// Use the http plugin.
engine.use(HttpPlugin);

// Start engine.
engine.start().catch((err) => {
	console.error(err);
});
