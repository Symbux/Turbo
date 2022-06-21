import { AbstractController, Http, Auth, Options, Catch } from '../../src';
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

	@Http.Get('/upload')
	public async upload(): Promise<Http.Response> {
		return new Http.Response(200, await readFile(resolve(__dirname, '../view/upload.html'), 'utf8'));
	}

	@Http.Post('/file/upload')
	public async fileUpload(context: Http.Context): Promise<Http.Response> {
		console.log(context.getFiles());
		return new Http.Response(200, { message: 'File was uploaded.' });
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

	@Http.Get('/manual-translate')
	public async manualTranslate(): Promise<Http.Response> {
		const langs = ['en-GB', 'fr-FR', 'es-ES'];
		const phrases = ['Home', 'Our Work', 'About Us', 'Contact Us', 'Get In Touch'];
		const output = langs.map(lang => {
			return phrases.map(phrase => {
				return this._t(phrase, lang);
			}).join(', ');
		});
		return new Http.Response(200, output.join('<br>'));
	}

	@Http.Get('/auto-translate/:lang')
	public async autoTranslate(): Promise<Http.Response> {
		const data = '_t(Home), _t(Our Work), _t(About Us), _t(Contact Us), _t(Get In Touch)';
		const response = new Http.Response(200, data);
		response.shouldTranslate(true);
		return response;
	}

	@Http.Get('/cached')
	public async getCached(): Promise<Http.Response> {
		const data = { time: new Date().valueOf() };
		return new Http.Response(200, data, undefined, true);
	}

	@Http.Get('/task/run/:name')
	public async executeTask(context: Http.Context): Promise<Http.Response> {
		try {
			const name = context.getParams().name;
			const taskFinished = await this.runTask(name);
			return new Http.Response(200, {
				taskName: name,
				taskFinished,
			});
		} catch(err) {
			return new Http.Response(404, {
				error: (err as Error).message,
			});
		}
	}
}
