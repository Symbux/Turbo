import { Middleware, Http, AbstractMiddleware } from '../..';

@Middleware('http.cors', { allow: ['*'] })
export class CorsMiddleware extends AbstractMiddleware {
	public async use(context: Http.Context): Promise<void> {
		context.setHeader('Access-Control-Allow-Origin', '*');
	}
}
