import { IPlugin } from '../../interface/implements';
import { Engine } from '../../module/engine';
import { WsService as Service } from './service';
import { IOptions, IPacket, IMiddleware, IWsConnection, IWsConnections } from './types';
import { Context } from './context';
import { Controller } from './controller';
import { Action } from './methods';
import { WsInternalController } from './internal';
import packageJson from '../../../package.json';

/**
 * WS plugin exports.
 *
 * @plugin Ws
 */
export {
	Context,
	Controller,
	Action,
	Service,
	IOptions,
	IPacket,
	IMiddleware,
	IWsConnection,
	IWsConnections,
};

/**
 * Pass to the engine.use method to install the plugin.
 *
 * @plugin Ws
 * @implements IPlugin
 * @class WsPlugin
 */
export default class Plugin implements IPlugin {

	public name = 'ws';
	public version = packageJson.version;

	/**
	 * Creates an instance of WsPlugin.
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
		engine.registerSingle(WsInternalController);
	}
}
