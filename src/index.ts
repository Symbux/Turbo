import 'reflect-metadata';
import { Inject, Provide, Injector } from '@symbux/injector';

import { AbstractController } from './abstract/controller';
import { AbstractService } from './abstract/service';
import { DecoratorHelper } from './helper/decorator';
import { IKeyValue } from './interface/generic';
import { IOptions } from './interface/options';
import { IPlugin } from './interface/plugin';
import { IService } from './interface/service';
import { Authenticator } from './module/authenticator';
import { Autowire } from './module/autowire';
import { Engine } from './module/engine';
import { Registry } from './module/registry';
import { Services } from './module/services';

import * as Auth from './decorator/auth';
import HttpPlugin, * as Http from './plugin/http';

export default Engine;

export {
	AbstractController,
	AbstractService,
	DecoratorHelper,
	IKeyValue,
	IOptions,
	IPlugin,
	IService,
	Authenticator,
	Autowire,
	Engine,
	Registry,
	Services,

	Http,
	Auth,

	Inject,
	Provide,
	Injector,

	HttpPlugin,
}
