import { Middleware, Http } from '../../src';

@Middleware('http.auth')
export default class HttpAuthMiddleware {
	public async use(context: Http.Context): Promise<void> {
		context.setAuth({ user: 'public', email: 'noreply@example.com', roles: ['PUBLIC'] });
		context.next();
	}
}
