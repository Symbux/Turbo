import 'reflect-metadata';

// Abstract
import { AbstractController } from './abstract/controller';
import { AbstractMiddleware } from './abstract/middleware';
import { AbstractService } from './abstract/service';

// Decorator
import * as Auth from './decorator/auth';
import { Expose } from './decorator/expose';
import { Fibre } from './decorator/fibre';
import { Middleware } from './decorator/middleware';
import { Service } from './decorator/service';
import { Task } from './decorator/task';

// Fibre
import { FibreManager } from './fibre/manager';

// Helper
import { DecoratorHelper } from './helper/decorator';
import * as Misc from './helper/misc';

// Interface & Types
import { ILogger, IPlugin, ITask, IGenericMiddleware, IGenericContext, IAuthCheck, Constructor } from './interface/implements';
import { IOptions, FibreOptions, FibreThread, FibreItem, FibreResponse, IAuthResponse } from './interface/structures';

// Module
import { Authentication } from './module/authentication';
import { Autowire } from './module/autowire';
import { Engine } from './module/engine';
import { Logger } from './module/logger';
import { Registry } from './module/registry';
import { Runner } from './module/runner';
import { Services } from './module/services';

// Plugins
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
	FibreManager,
	DecoratorHelper,
	Misc,
	ILogger, IPlugin, ITask, IGenericMiddleware, IGenericContext, IAuthCheck, Constructor,
	IOptions, FibreOptions, FibreThread, FibreItem, FibreResponse, IAuthResponse,
	Authentication,
	Autowire,
	Engine,
	Logger,
	Registry,
	Runner,
	Services,

	Http,
	Ws,
	Auth,

	HttpPlugin,
	WsPlugin,
};
