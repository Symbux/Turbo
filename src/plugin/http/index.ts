import { IPlugin } from '../../interface/plugin';
import { Engine } from '../../module/engine';
import { Context } from './context';
import { Controller } from './controller';
import { Get, Post, Put, Patch, Delete, Options } from './methods';
import { Response } from './response';
import { Service } from './service';
import { IPluginOptions } from './types';

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
}

export default class Plugin implements IPlugin {

	public constructor(private options: IPluginOptions) {}

	public install(engine: Engine): void {
		engine.register(Service, this.options);
	}
}
