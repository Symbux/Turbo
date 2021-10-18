import 'reflect-metadata';
import { AbstractController } from './abstract/controller';
import { AbstractService } from './abstract/service';
import { Middleware } from './decorator/middleware';
import { Service } from './decorator/service';
import { Task } from './decorator/task';
import { DecoratorHelper } from './helper/decorator';
import { ILogger } from './interface/logger';
import { IOptions } from './interface/options';
import { IPlugin } from './interface/plugin';
import { Autowire } from './module/autowire';
import { Engine } from './module/engine';
import { Registry } from './module/registry';
import { Services } from './module/services';

import * as Auth from './decorator/auth';
import HttpPlugin, * as Http from './plugin/http';
import WsPlugin, * as Ws from './plugin/ws';

export default Engine;

export {
	AbstractController,
	AbstractService,
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
