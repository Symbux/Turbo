import 'reflect-metadata';

// Abstract
import { AbstractController } from './abstract/controller';
import { AbstractMiddleware } from './abstract/middleware';
import { AbstractService } from './abstract/service';

// Decorator
import * as Auth from './decorator/auth';
import * as Event from './decorator/event';
import { Expose } from './decorator/expose';
import { Fibre } from './decorator/fibre';
import { Middleware } from './decorator/middleware';
import { Options } from './decorator/options';
import { Service } from './decorator/service';
import { Task } from './decorator/task';

// Export
import PrismaClient from './export/prisma';

// Fibre
import { FibreManager } from './fibre/manager';

// Helper
import { DecoratorHelper } from './helper/decorator';
import * as Misc from './helper/misc';

// Interface & Types
import { ILogger, IService, IPlugin, ITask, IGenericMiddleware, IGenericContext, IAuthCheck, Constructor } from './interface/implements';
import { IOptions, FibreOptions, FibreThread, FibreItem, FibreResponse, ICountryItem, ILanguageItem, EventType } from './interface/structures';

// Module
import { Authentication } from './module/authentication';
import { Autowire } from './module/autowire';
import { Database } from './module/database';
import { Engine } from './module/engine';
import { EventManager } from './module/events';
import { Logger } from './module/logger';
import { Registry } from './module/registry';
import { Runner } from './module/runner';
import { Services } from './module/services';
import { Translator } from './module/translator';

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
	Event,
	Expose,
	Fibre,
	Middleware,
	Options,
	Service,
	Task,
	PrismaClient,
	FibreManager,
	DecoratorHelper,
	Misc,
	ILogger, IService, IPlugin, ITask, IGenericMiddleware, IGenericContext, IAuthCheck, Constructor,
	IOptions, FibreOptions, FibreThread, FibreItem, FibreResponse, ICountryItem, ILanguageItem, EventType,
	Authentication,
	Autowire,
	Database,
	Engine,
	EventManager,
	Logger,
	Registry,
	Runner,
	Services,
	Translator,

	Http,
	Ws,
	Auth,

	HttpPlugin,
	WsPlugin,
};
