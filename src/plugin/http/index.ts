import { IPlugin } from '../../interface/plugin';
import { Engine } from '../../module/engine';
import { Context } from './context';
import { Controller } from './controller';
import { Get, Post, Put, Patch, Delete, Options } from './methods';
import { Response } from './response';
import { HttpService as Service } from './service';
import { IPluginOptions } from './types';
import { CorsMiddleware } from './middleware';
import packageJson from '../../../package.json';

export {
	Context,
	Controller,
	Get,
	Post,
	Put,
	Patch,
	Delete,
	Options,
	Response,
	Service,
};

export default class Plugin implements IPlugin {

	public constructor(private options?: IPluginOptions) {}

	public name = 'http';
	public version = packageJson.version;

	public install(engine: Engine): void {
		engine.registerSingle(Service, this.options);
		engine.registerSingle(CorsMiddleware);
	}
}
