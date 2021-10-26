export type FibreMode = 'thread' | 'pool';

export type FibreOptions ={
	poolSize?: number;
	threadExpiry?: number;
	warmThread?: boolean;
};

export type FibreThread = (...args: any[]) => Promise<any>;

export type FibreItem = {
	name: string;
	mode: FibreMode;
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
