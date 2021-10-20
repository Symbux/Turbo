export interface IPluginOptions {
	path?: string;
	options?: Record<string, any>;
	port?: number;
}

export interface IWsPacket {
	command: string,
	content?: Record<string | symbol, any>,
}
