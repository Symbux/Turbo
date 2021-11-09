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
	basepath?: string;
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
 * Defines the structure of a middleware call, this allows the engine to know
 * when to stop running after calling a middleware or when the middleware has
 * thrown an error.
 *
 * @interface IAuthResponse
 */
export interface IAuthResponse {
	failed: boolean;
	stop: boolean;
}
