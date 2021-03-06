import { ILogger } from './implements';

/**
 * Defines the structure for the engine options, which are given
 * when initialising the engine.
 *
 * @interface IOptions
 */
export interface IOptions {
	port: number;
	host: string;
	autowire: boolean;
	folders: string[];
	scanFoldersOnly?: boolean;
	translations?: string;
	database?: boolean;
	errors?: {
		handler?: (err: Error) => void | Promise<void>;
		continue?: boolean;
	},
	basepath?: {
		source: string;
		compiled: string;
	};
	logger?: ILogger;
	logLevels?: Array<'info' | 'warn' | 'error' | 'verbose' | 'debug'>;
}

/**
 * Defines the structure for a fibre's options.
 *
 * @type FibreOptions
 */
export type FibreOptions = {
	expiry?: number;
	warmup?: boolean;
};

/**
 * Defines the structure of a fibre thread, so that it can be roughly
 * typed and used in the engine.
 *
 * @type FibreThread
 */
export type FibreThread = (...args: any[]) => Promise<any>;

/**
 * Defines the structure of a FibreItem, which is what the FibreManager
 * uses internally to keep track of fibres, this may change in the future,
 * as more features are added, but all existing fields should be kept.
 *
 * @type FibreItem
 */
export type FibreItem = {
	name: string;
	path: string,
	options: FibreOptions;
	thread?: FibreThread;
	created: number;
	lastUsed: number;
	methods: string[],
};

/**
 * Defines the structure of a fibre response, this is the response returned
 * by a fibre's method when called via the proxy.
 *
 * @tpe FibreResponse
 */
export type FibreResponse = {
	status: boolean;
	error?: string;
	data?: any;
	executionTime?: number;
};

/**
 * Defines the structure of a country data, that comes from the JSON data.
 *
 * @type ICountryData
 */
export type ICountryData = Record<string, ICountryItem>;

/**
 * Defines the structure of a country item, that comes from the JSON data.
 *
 * @type ICountryItem
 */
export type ICountryItem = {
	name: string;
	native: string;
	phone: string;
	continent: string;
	capital: string;
	currency: string;
	languages: string[];
};


/**
 * Defines the structure of a language data, that comes from the JSON data.
 *
 * @type ILanguageData
 */
export type ILanguageData = Record<string, ILanguageItem>;

/**
 * Defines the structure of a language item, that comes from the JSON data.
 *
 * @type ILanguageItem
 */
export type ILanguageItem = {
	name: string;
	native: string;
	rtl?: number;
};

/**
 * Available event types.
 *
 * @enum EventType
 */
export enum EventType {
	BEFORE_INIT = 'BEFORE_INIT',
	AFTER_INIT = 'AFTER_INIT',
	BEFORE_START = 'BEFORE_START',
	AFTER_START = 'AFTER_START',
	BEFORE_STOP = 'BEFORE_STOP',
	AFTER_STOP = 'AFTER_STOP',
}
