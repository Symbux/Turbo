import 'reflect-metadata';
import { Inject, Provide, Injector } from '@symbux/injector';

import { AbstractController } from './abstract/controller';
import { AbstractService } from './abstract/service';
import { IOptions } from './interface/options';
import { IKeyValue } from './interface/generic';
import { IPlugin } from './interface/plugin';
import { IService } from './interface/service';
import { Engine } from './module/engine';

import * as Auth from './decorator/auth';
import HttpPlugin, * as Http from './plugin/http';

export default Engine;

export {
	AbstractController,
	AbstractService,
	IKeyValue,
	IOptions,
	IPlugin,
	IService,
	Engine,

	Http,
	Auth,

	Inject,
	Provide,
	Injector,

	HttpPlugin,
}
