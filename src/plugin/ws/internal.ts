import { Controller } from './controller';
import { Action } from './methods';
import { Context } from './context';

@Controller('::internal')
export class WsInternalController {

	@Action()
	public async language(context: Context): Promise<void> {
		const language = context.getPacket().content?.language;
		const connection = context.getConnection();
		if (language) {
			context.setLanguage(language);
			connection.languages.unshift(language);
		}
		context.send({
			command: '::internal/language',
			content: {
				status: true,
			},
		});
	}

	@Action()
	public async subscribe(context: Context): Promise<void> {
		const packet = context.getPacket();
		const subscriptions: string[] = packet.content ? packet.content.subscriptions : [];
		const connection = context.getConnection();
		connection.subscriptions.push(...subscriptions);
		context.send({
			command: '::internal/subscribe',
			content: {
				status: true,
			},
		});
	}

	@Action()
	public async unsubscribe(context: Context): Promise<void> {
		const packet = context.getPacket();
		const subscriptions: string[] = packet.content ? packet.content.subscriptions : [];
		const connection = context.getConnection();
		subscriptions.forEach((subscription) => {
			const index = connection.subscriptions.indexOf(subscription);
			if (index !== -1) connection.subscriptions.splice(index, 1);
		});
		context.send({
			command: '::internal/unsubscribe',
			content: {
				status: true,
			},
		});
	}

	@Action()
	public async subscriptions(context: Context): Promise<void> {
		const connection = context.getConnection();
		context.send({
			command: '::internal/subscriptions',
			content: {
				subscriptions: connection.subscriptions,
			},
		});
	}

	@Action()
	public async ping(context: Context): Promise<void> {
		context.send({
			command: '::internal/pong',
		});
	}
}
