import { Inject } from '@symbux/injector';
import { DecoratorHelper } from '..';
import { ILogger } from '../interface/implements';
import { EventType } from '../interface/structures';
import { Registry } from './registry';

/**
 * The event manager class is a module that allows for registering
 * event listeners into the framework where you can hook into various
 * events.
 *
 * As part of this functionality, all listeners can be defined as sync or
 * async, and each hook can be told to tell the framework to wait before
 * the hook is finished executing, now this isn't recommended in most use
 * cases but there are some where this could come in useful, additional to
 * this, all plugins, can register hooks as well. Verbose logging will detail
 * any and all hooks that are registered by the platform.
 *
 * @class EventManager
 * @provides EventManager {turbo.events}
 * @injects logger
 */
export class EventManager {
	@Inject('logger') private logger!: ILogger;
	private events: any[] = [];

	public constructor() {
		Registry.set('turbo.events', this);
	}

	/**
	 * Will initialise all hooks that have been registered into the framework,
	 * this should only be called after all plugins have been registered.
	 *
	 * There are methods for initialising a hook dynamically, but we usually
	 * suggest doing it beforehand, in case there are unintended side effects.
	 */
	public async initialise(): Promise<void> {

		// Get the hooks from the registry.
		const events = Registry.getModules('event');
		this.events = events.map(event => {
			const methods = DecoratorHelper.getMetadata('t:methods', [], event.instance);
			event.methods = {};
			event.waited = [];
			Object.keys(methods).forEach((propertyKey: any) => {
				const method = methods[propertyKey];
				if (typeof event.methods[method.type] === 'undefined') event.methods[method.type] = [];
				event.methods[method.type].push(propertyKey);
				if (method.wait) event.waited.push(propertyKey);
			});
			return event;
		});
	}

	/**
	 * This method will be called by the platform at certain points, the event manager
	 * will call the correct listeners all async.
	 *
	 * @param type The type of event to dispatch.
	 */
	public async dispatch(type: EventType): Promise<void> {

		// Log the dispatch.
		this.logger.verbose('EVENT', `Dispatching event: "${type}".`);

		// Now let's loop the event listeners and loop the methods.
		for (const index in this.events) {

			// Get the methods for the event.
			const methods = this.events[index].methods[type];
			if (!methods) continue;

			// Loop the methods and call them.
			for (const method of methods) {

				// Define the method and instance.
				const event = this.events[index].instance;
				const methodInstance = event[method];

				// Check for valid function then call either async/sync.
				if (typeof methodInstance === 'function') {
					if (this.events[index].waited.includes(method)) {
						await methodInstance.call(event);
					} else {
						methodInstance.call(event);
					}
				}
			}
		}
	}
}
