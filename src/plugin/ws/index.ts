import { IPlugin } from '../../interface/implements';
import { Engine } from '../../module/engine';
import { WsService as Service } from './service';
import { IOptions, IPacket, IMiddleware } from './types';
import { Context } from './context';
import { Controller } from './controller';
import { Action } from './methods';
import { WsInternalController } from './internal';
import packageJson from '../../../package.json';

export {
	Context,
	Controller,
	Action,
	Service,
	IOptions,
	IPacket,
	IMiddleware,
};

export default class Plugin implements IPlugin {

	public constructor(private options?: IOptions) {}

	public name = 'ws';
	public version = packageJson.version;

	public install(engine: Engine): void {
		engine.registerSingle(Service, this.options);
		engine.registerSingle(WsInternalController);
	}
}
