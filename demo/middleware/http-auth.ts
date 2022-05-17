import { Middleware, Http, AbstractMiddleware } from '../../src';

@Middleware('http.auth')
export default class DemoAuthMiddleware extends AbstractMiddleware implements Http.IMiddleware {
	public async handle(context: Http.Context): Promise<boolean> {
		context.setAuth({ user: 'public', email: 'noreply@example.com', roles: ['admin'] });
		return false;
	}
}
