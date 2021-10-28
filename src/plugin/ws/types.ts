import { Context } from './context';
import { IGenericMiddleware } from '../../interface/implements';

export interface IOptions {
	path?: string;
	options?: Record<string, any>;
	port?: number;
}

export interface IPacket {
	command: string,
	content?: Record<string | symbol, any>,
}

export interface IMiddleware extends IGenericMiddleware {
	handle: (context: Context) => Promise<void>;
}
