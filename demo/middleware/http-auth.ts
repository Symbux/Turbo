import { Middleware, Http, AbstractMiddleware } from '../../src';

@Middleware('http.auth', { priority: 1 })
export default class DemoAuthMiddleware extends AbstractMiddleware {
	public async handle(context: Http.Context): Promise<void> {
		context.setAuth({ user: 'public', email: 'noreply@example.com', roles: ['admin'] });
	}
}
