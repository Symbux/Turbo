import { IPlugin } from '../../interface/implements';
import { Engine } from '../../module/engine';
import { Context } from './context';
import { Controller } from './controller';
import { Get, Post, Put, Patch, Delete, Options } from './methods';
import { Response } from './response';
import { HttpService as Service } from './service';
import { IOptions, IMiddleware } from './types';
import { Registry } from '../../module/registry';

/**
 * Http plugin exports.
 *
 * @plugin Http
 */
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

/**
 * Pass to the engine.use method to install the plugin.
 *
 * @plugin Http
 * @implements IPlugin
 * @class HttpPlugin
 */
export default class Plugin implements IPlugin {

	public name = 'http';
	public version = Registry.get('turbo.version');

	/**
	 * Creates an instance of HttpPlugin.
	 *
	 * @param options The options for the plugin.
	 * @constructor
	 */
	public constructor(private options?: IOptions) {}

	/**
	 * Will install itself to the engine.
	 *
	 * @param engine The engine to install the plugin to.
	 * @returns void
	 * @public
	 */
	public install(engine: Engine): void {
		engine.registerSingle(Service, this.options);
	}
}
