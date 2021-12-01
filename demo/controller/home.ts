import { AbstractController, Http, Auth, Options } from '../../src';
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
@Options({ controller: 'home' })
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

	@Http.Get('/fibre1')
	public async fibre1(): Promise<Http.Response> {
		const demoFibre = new ExampleFibre();
		const output = await demoFibre.callGetName('Bob');
		return new Http.Response(200, output);
	}

	@Http.Get('/translate')
	public async translate(): Promise<Http.Response> {
		const langs = ['en_GB', 'fr_FR', 'es_ES'];
		const phrases = ['Home', 'Our Work', 'About Us', 'Contact Us', 'Get In Touch'];
		const output = langs.map(lang => {
			return phrases.map(phrase => {
				return this._t(phrase, lang);
			}).join(', ');
		});
		return new Http.Response(200, output.join('<br>'));
	}
}
