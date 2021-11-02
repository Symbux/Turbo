import { Context } from './context';
import { IGenericMiddleware } from '../../interface/implements';
import * as WS from 'ws';

/**
 * Defines the structure of the options to give to the service.
 *
 * @plugin Ws
 * @interface IOptions
 */
export interface IOptions {
	path?: string;
	options?: Record<string, any>;
	port?: number;
}

export interface IWsConnection {
	socket: WS;
	request: Request;
	subscriptions: Array<string>;
	session: Record<string, any>;
}

export interface IWsConnections {
	[key: string]: {
		socket: WS;
		request: Request;
		subscriptions: Array<string>;
		session: Map<string, any>;
	}
}

/**
 * The structure of a packet for a websocket.
 *
 * @plugin Ws
 */
export interface IPacket {
	command: string,
	content?: Record<string | symbol, any>,
}

/**
 * Defines the expected structure of a middleware with specific
 * typing for the WsPlugin's context.
 *
 * @plugin Ws
 * @interface IMiddleware
 * @extends IGenericMiddleware
 */
export interface IMiddleware extends IGenericMiddleware {
	handle: (context: Context) => Promise<boolean>;
}
