import { IGenericMiddleware } from '../../interface/implements';
import { Context } from './context';

/**
 * Defines the structure of the options to give to the service.
 *
 * @plugin Http
 * @interface IOptions
 */
export interface IOptions {
	port: number;
	host?: string;
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
