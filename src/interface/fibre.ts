export type FibreMode = 'thread' | 'pool';

export type FibreOptions ={
	poolSize?: number;
	keepWarm?: boolean;
};

export type FibreThread = (...args: any[]) => Promise<any>;

export type FibreItem = {
	name: string;
	mode: FibreMode;
	options: FibreOptions;
	thread: FibreThread;
};

export type FibreResponse = {
	status: boolean;
	error?: string;
	data?: any;
	executionTime?: number;
};
