import { Inject } from '@symbux/injector';
import { AbstractController, Http, PrismaClient } from '../../src';

@Http.Controller('/paths')
export default class PathsController extends AbstractController {
	@Inject() private prisma!: PrismaClient;

	@Http.Get(['/hello', '/world', '/how', '/are', '/you'])
	public async index(context: Http.Context): Promise<Http.Response> {
		const path = context.getRaw().baseUrl;
		return new Http.Response(200, path);
	}
}
