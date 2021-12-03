import { Middleware, Http, AbstractMiddleware } from '../../src';

@Middleware('http.lang')
export default class DemoLangMiddleware extends AbstractMiddleware implements Http.IMiddleware {
	public async handle(context: Http.Context): Promise<boolean> {
		context.setLanguage(context.getParams().lang || 'en-GB');
		return false;
	}
}
