import { IPlugin } from '../../interface/implements';
import { Engine } from '../../module/engine';
import { Context } from './context';
import { Controller } from './controller';
import { Get, Post, Put, Patch, Delete, Options } from './methods';
import { Response } from './response';
import { HttpService as Service } from './service';
import { IOptions, IMiddleware } from './types';
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
	IOptions,
	IMiddleware,
};

export default class Plugin implements IPlugin {

	public constructor(private options?: IOptions) {}

	public name = 'http';
	public version = packageJson.version;

	public install(engine: Engine): void {
		engine.registerSingle(Service, this.options);
	}
}
