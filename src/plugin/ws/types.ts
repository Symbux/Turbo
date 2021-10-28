export interface IOptions {
	path?: string;
	options?: Record<string, any>;
	port?: number;
}

export interface IPacket {
	command: string,
	content?: Record<string | symbol, any>,
}
