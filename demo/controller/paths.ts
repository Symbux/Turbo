import { AbstractController, Http } from '../../src';

@Http.Controller('/multipath')
export default class PathsController extends AbstractController {

	@Http.Get(['/hello', '/world', '/how', '/are', '/you'])
	@Http.Catch(e => new Http.Response(500, e.message))
	public async index(): Promise<Http.Response> {
		return new Http.Response(200, 'IT WORKS');
	}
}
