import { AbstractController, Ws } from '../../src';

@Ws.Controller('wsapi')
export default class WsapiController extends AbstractController {

	@Ws.Action()
	public async index(context: Ws.Context): Promise<void> {
		context.send({
			command: 'hello',
			content: {
				message: 'Hello World!',
			},
		});
	}
}
