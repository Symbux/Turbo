import { Inject } from '@symbux/injector';
import { AbstractController, Ws } from '../../src';
import { Misc } from '../provide/misc';

@Ws.Controller('wsapi')
export default class WsapiController extends AbstractController {

	@Inject() private misc!: Misc;

	@Ws.Action()
	public async index(context: Ws.Context): Promise<void> {
		context.send({
			command: 'hello',
			content: {
				message: 'Hello World!',
				quickmaths: this.misc.add(1, 2),
			},
		});
	}
}
