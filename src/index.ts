import 'reflect-metadata';
import { AbstractController } from './abstract/controller';
import { AbstractMiddleware } from './abstract/middleware';
import { AbstractService } from './abstract/service';
import { Expose } from './decorator/expose';
import { Fibre } from './decorator/fibre';
import { Middleware } from './decorator/middleware';
import { Service } from './decorator/service';
import { Task } from './decorator/task';
import { DecoratorHelper } from './helper/decorator';
import { ILogger, IPlugin } from './interface/implements';
import { IOptions } from './interface/structures';
import { Autowire } from './module/autowire';
import { Engine } from './module/engine';
import { Registry } from './module/registry';
import { Services } from './module/services';

import * as Auth from './decorator/auth';
import HttpPlugin, * as Http from './plugin/http';
import WsPlugin, * as Ws from './plugin/ws';

/**
 * The main class of the framework.
 *
 * @export
 */
export default Engine;

/**
 * All re-exported classes from the framework.
 *
 * @export
 */
export {
	AbstractController,
	AbstractMiddleware,
	AbstractService,
	Expose,
	Fibre,
	Middleware,
	Service,
	Task,
	DecoratorHelper,
	ILogger,
	IOptions,
	IPlugin,
	Autowire,
	Engine,
	Registry,
	Services,

	Http,
	Ws,
	Auth,

	HttpPlugin,
	WsPlugin,
};
