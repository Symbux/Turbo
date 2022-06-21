import { IGenericMiddleware } from '../../interface/implements';
import { Context } from './context';
import { CompressionOptions } from 'compression';

/**
 * Defines the structure of the options to give to the service.
 *
 * Available Options:
 *
 * - host = The host to listen on.
 * - port = The port to listen on.
 * - static = An array of static folders to serve (run after route creation).
 * - security = An object of security-related options.
 *   - trustProxy = An array of IP/host addresses to trust.
 *   - disablePoweredBy = Disable the X-Powered-By header.
 *   - enableHelmet = Enables the Helmet package (https://www.npmjs.com/package/helmet).
 *   - helmetOptions = Options to pass to the Helmet package when initialised.
 *
 * @plugin Http
 * @interface IOptions
 */
export interface IOptions {
	port: number;
	host?: string;
	static?: IOptionsStaticItem[];
	cache?: ICache;
	uploads?: {
		enabled: boolean;
		maxFileSize?: number;
		tempFileDir?: string;
		debug?: string;
		uploadTimeout?: number;
	};
	security?: {
		trustProxy?: string[];
		disablePoweredBy?: boolean;
		enableHelmet?: boolean;
		helmetOptions?: Record<string, any>;
	};
	compression?: {
		enabled?: boolean;
		options?: CompressionOptions;
	};
}

/**
 * Defines the structure of the static express item, usually a
 * folder to link, optionally with a path.
 */
export interface IOptionsStaticItem {
	folder: string;
	pathname?: string;
}

/**
 * Defines the expected structure of a middleware with specific
 * typing for the HttpPlugin's context.
 *
 * @plugin Http
 * @interface IMiddleware
 * @extends IGenericMiddleware
 */
export interface IMiddleware extends IGenericMiddleware {
	handle: (context: Context) => Promise<boolean>;
}

/**
 * An interface to implement for any LRU based caching system, this will be
 * used by the HTTP module to cache responses, depending on if you allow it.
 *
 * This version uses async methods.
 *
 * @interface ICache
 * @async
 */
export interface ICache {
	get: (key: string) => Promise<any>;
	set: (key: string, value: any) => Promise<void>;
	del: (key: string) => Promise<void>;
	clear: () => Promise<void>;
}
