import { Middleware, Http, AbstractMiddleware } from '../..';
import { IMiddleware } from './types';

@Middleware('http.cors.all', { allow: ['*'] })
export class CorsMiddleware extends AbstractMiddleware implements IMiddleware {
	public async handle(context: Http.Context): Promise<void> {
		context.setHeader('Access-Control-Allow-Origin', '*');
	}
}
