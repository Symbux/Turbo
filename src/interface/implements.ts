import { Engine } from '../module/engine';

/**
 * Defines the base structure of a logger and the methods that are
 * expected by the framework and documentation.
 *
 * @interface ILogger
 */
export interface ILogger {
	log: (level: 'info' | 'warn' | 'error' | 'verbose' | 'debug', title: string, message: string) => void;
	info: (title: string, message: string) => void;
	warn: (title: string, message: string) => void;
	error: (title: string, message: string, err?: Error) => void;
	verbose: (title: string, message: string, err?: Error) => void;
	debug: (title: string, message: string, err?: Error) => void;
}

/**
 * Defines the base structure of a service and what methods a service
 * MUST implement.
 *
 * @interface IService
 */
export interface IService {
	initialise: () => Promise<void>;
	start: () => Promise<void>;
	stop: () => Promise<void>;
}

/**
 * Defines the structure of a plugin, and the required methods and
 * metadata that should be available.
 *
 * @interface IPlugin
 */
export interface IPlugin {
	install: (engine: Engine) => void;
	name: string;
	version: string;
}

/**
 * Defines the structure of a task and the required methods it
 * should implement.
 *
 * @interface ITask
 */
export interface ITask {
	execute: () => Promise<void>;
}

/**
 * Defines a generic structure for the middleware, all service
 * based middleware should extend this interface. This interface
 * is used for typing from inside of the authentication module.
 *
 * @interface IGenericMiddleware
 */
export interface IGenericMiddleware {
	handle: (context: any) => Promise<boolean>;
}

/**
 * Defines a generic context structure and an expected function, this
 * is done so that type checking passes, as all contexts should contain
 * this method.
 *
 * @interface IGenericContext
 */
export interface IGenericContext {
	getAuth: () => Record<string, any>;
}

/**
 * Defines the structure of an auth check, used by the `@Auth` decorators,
 * which contains the required structure of an auth check including the
 * actual function check and a type name for logging.
 *
 * @interface IAuthCheck
 */
export interface IAuthCheck {
	func: (auth: Record<string, any>) => boolean;
	type: string;
}

/**
 * This is a generic structure for type checking classes instead of an
 * instance of a class, so if you expect the class constructor instead
 * of an instance of a class, you can use this structure.
 *
 * Example:
 *   const something = (someClass: Constructor<SomeClass>) => {};
 *
 * @type Constructor
 */
export type Constructor<T> = {
	new (...args: any[]): T
};
