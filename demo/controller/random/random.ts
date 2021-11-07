import { AbstractController, Http } from '../../../src';

@Http.Controller('/random')
export default class RandomController extends AbstractController {

	@Http.Get('/')
	public async index(): Promise<Http.Response> {
		return new Http.Response(200, 'Hello, World!');
	}
}
