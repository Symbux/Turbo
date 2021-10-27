export type FibreOptions = {
	threadExpiry?: number;
	warmThread?: boolean;
};

export type FibreThread = (...args: any[]) => Promise<any>;

export type FibrePool = any;

export type FibreItem = {
	name: string;
	path: string,
	options: FibreOptions;
	thread?: FibreThread;
	created: number;
	lastUsed: number;
};

export type FibreResponse = {
	status: boolean;
	error?: string;
	data?: any;
	executionTime?: number;
};
