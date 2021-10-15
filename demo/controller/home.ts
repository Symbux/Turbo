import { AbstractController, Http, Auth } from '../../src';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

@Http.Controller('/')
@Auth.Use('http.auth')
@Auth.Use('http.cors.all')
export default class HomeController extends AbstractController {

	@Http.Get('/')
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
}
