import { Engine, HttpPlugin } from '@symbux/turbo';
import { DiscordPlugin } from '@symbux/turbo-plugin-discord';

// Create instance.
const engine = new Engine({
	autowire: true,
});

// Add plugins.
engine.use(new HttpPlugin({ port: 8080 }));
engine.use(new DiscordPlugin({ token: 'ABCDEF' }));

// Create some event listeners.
// engine.event.on('ready', () => console.log('Turbo has now started.'));
// engine.event.on('error', (err: Error) => console.error('Turbo error:', err));

// Start engine.
engine.start()
	.then(() => console.log('Turbo application was stopped.'))
	.catch((err: Error) => console.error('Turbo error:', err));

