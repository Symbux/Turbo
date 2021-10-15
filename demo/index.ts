import { Engine, HttpPlugin } from '../src';
import HomeController from './controller/home';
import HttpAuthMiddleware from './middleware/http-auth';
import MemoryTask from './task/memory';

// Initialise engine instance.
const engine = new Engine({
	autowire: false,
});

// Use the http plugin.
engine.use(new HttpPlugin({
	port: 3000,
}));

// Register modules.
engine.register([
	HomeController,
	HttpAuthMiddleware,
	MemoryTask,
]);

// Start engine.
engine.start().catch((err) => {
	console.error(err);
});
