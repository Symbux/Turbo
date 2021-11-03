import { IGenericMiddleware } from '../../interface/implements';
import { Context } from './context';

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
	security?: {
		trustProxy?: string[];
		disablePoweredBy?: boolean;
		enableHelmet?: boolean;
		helmetOptions?: Record<string, any>;
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
