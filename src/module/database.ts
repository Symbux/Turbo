import { PrismaClient } from '@prisma/client';
import { Inject, Injector } from '@symbux/injector';
import { IOptions } from '../interface/structures';
import { ILogger } from '../interface/implements';

export class Database {
	private client?: PrismaClient;
	@Inject('logger') private logger!: ILogger;

	public constructor(private options: Partial<IOptions>) {
		if (this.options.database) {
			this.logger.info('DATABASE', 'Initialising the prisma client.');
			this.client = new PrismaClient();
			Injector.register('PrismaClient', this.client);
		}
	}

	public async initialise(): Promise<void> {
		if (this.options.database) {
			this.logger.info('DATABASE', 'Connecting the prisma client.');
			await this.client?.$connect();
		}
	}

	public async stop(): Promise<void> {
		if (this.options.database) {
			this.logger.info('DATABASE', 'Disconnecting the prisma client.');
			await this.client?.$disconnect();
		}
	}
}
