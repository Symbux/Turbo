import { IPlugin } from '../../interface/plugin';
import { Engine } from '../../module/engine';
import { Context } from './context';
import { Controller } from './controller';
import { Get, Post, Put, Patch, Delete, Options } from './methods';
import { Response } from './response';
import { Service } from './service';

const plugin: IPlugin = {
	install: (engine: Engine) => {
		engine.register(Service);
	}
}

export default plugin;

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
