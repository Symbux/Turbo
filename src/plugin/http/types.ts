import { Context } from './context';

export interface IOptions {
	port: number;
	host?: string;
}

export interface IMiddleware {
	handle: (context: Context) => Promise<void>;
}
