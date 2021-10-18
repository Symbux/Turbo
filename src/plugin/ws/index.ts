import { IPlugin } from '../../interface/plugin';
import { Engine } from '../../module/engine';
import { WsService as Service } from './service';
import { IPluginOptions } from './types';
import packageJson from '../../../package.json';

export {
	Service,
};

export default class Plugin implements IPlugin {

	public constructor(private options: IPluginOptions) {}

	public name = 'ws';
	public version = packageJson.version;

	public install(engine: Engine): void {
		engine.registerSingle(Service, this.options);
	}
}
