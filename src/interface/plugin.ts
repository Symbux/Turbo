import { Engine } from '../module/engine';

export interface IPlugin {
	install: (engine: Engine) => void;
	name: string;
	version: string;
}
