import { AbstractController, Http, Auth } from '../../src';

@Http.Controller('/users')
export class UsersController extends AbstractController {

	@Http.Get('/')
	@Auth.Authenticated()
	public async index(): Promise<Http.Response> {
		return new Http.Response(200, []);
	}

	@Http.Post('/')
	@Auth.Has('role')
	@Auth.Is('blocked', false)
	public async create(context: Http.Context): Promise<Http.Response> {
		console.log(context.getBody());
		return new Http.Response(201, {
			message: 'User was created.',
		});
	}
}
