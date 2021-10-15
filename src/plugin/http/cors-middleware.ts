import { Middleware, Http } from '../../../src';

@Middleware('http.cors.all')
export default class HttpAuthMiddleware {
	public async use(context: Http.Context): Promise<void> {
		context.setHeader('Access-Control-Allow-Origin', '*');
		context.next();
	}
}
