export interface IOptions {
	port: number;
	host: string;
	autowire: boolean;
	folders: string[];
	basepath?: string;
}

export type FibreOptions = {
	expiry?: number;
	warmup?: boolean;
};

export type FibreThread = (...args: any[]) => Promise<any>;

export type FibreItem = {
	name: string;
	path: string,
	options: FibreOptions;
	thread?: FibreThread;
	created: number;
	lastUsed: number;
	methods: string[],
};

export type FibreResponse = {
	status: boolean;
	error?: string;
	data?: any;
	executionTime?: number;
};
