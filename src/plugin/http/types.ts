import { IGenericMiddleware } from '../../interface/implements';
import { Context } from './context';

export interface IOptions {
	port: number;
	host?: string;
}

export interface IMiddleware extends IGenericMiddleware {
	handle: (context: Context) => Promise<void>;
}
