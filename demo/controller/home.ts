import { AbstractController, Http, Auth } from '../../src';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { ExampleFibre } from '../fibre/example';
import DemoAuthMiddleware from '../middleware/http-auth';

// Define custom check.
const customCheck = (auth: Record<string, any>) => {
	console.log('CustomCheck::Auth Data', auth);
	return true;
};

@Http.Controller('/')
@Auth.Use(DemoAuthMiddleware)
export default class HomeController extends AbstractController {

	@Http.Get('/')
	@Auth.Has('email')
	@Auth.Authenticated()
	@Auth.Custom(customCheck)
	@Auth.Is('user', 'public')
	@Auth.InArray('roles', 'admin')
	public async index(): Promise<Http.Response> {
		return new Http.Response(200, await readFile(resolve(__dirname, '../view/index.html'), 'utf8'));
	}

	@Http.Get('/data')
	public async data(): Promise<Http.Response> {
		return new Http.Response(200, { hello: 'world'});
	}

	@Http.Post('/')
	public async create(context: Http.Context): Promise<Http.Response> {
		console.log(context);
		return new Http.Response(201, {
			message: 'User was created.',
		});
	}

	@Http.Get('/fibre')
	public async fibre(): Promise<Http.Response> {
		const demoFibre = new ExampleFibre();
		const output = await demoFibre.getName('Bob');
		return new Http.Response(200, output);
	}
}
