import { Http} from '../../src';
import { Middleware, AbstractMiddleware } from '../../src';

@Middleware('http.lang', {}, 'http')
export default class DemoLangMiddleware extends AbstractMiddleware implements Http.IMiddleware {
	public async handle(context: Http.Context): Promise<boolean> {
		context.setLanguage(context.getParams().lang || 'en-GB');
		return true;
	}
}
