import { Request } from 'express';
import * as WS from 'ws';
import { WsService } from './service';
import { IWsPacket } from './types';

export class Context {
	private auth: Record<string, any> = {};

	public constructor(
		private request: Request,
		private socket: WS,
		private wsService: WsService,
		private packet: IWsPacket,
	) {}

	public setAuth(auth: Record<string, any>): void {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		const connection = this.wsService.getConnection(socketKey as string);
		connection.session.auth = auth;
	}

	public getAuth(): Record<string, any> {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		const connection = this.wsService.getConnection(socketKey as string);
		return connection.session.auth;
	}

	public getHeaders(): Record<string, string> {
		return Object.keys(this.request.headers).reduce((headers, header) => {
			headers[header] = this.request.headers[header];
			return headers;
		}, {});
	}

	public getQuery(): Record<string, any> {
		return this.request.query;
	}

	public getCookies(): Record<string, string> {
		return this.request.cookies;
	}

	public getParams(): Record<string, any> {
		return this.request.params;
	}

	public getBody(): Record<string, any> {
		return this.request.body;
	}

	public getIpAddress(): string {
		return this.request.socket.remoteAddress || '';
	}

	public getPacket(): IWsPacket {
		return this.packet;
	}

	public getRaw(): Request {
		return this.request;
	}

	public setSessionItem(key: string, value: any): void {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		const connection = this.wsService.getConnection(String(socketKey));
		connection.session.set(key, value);
	}

	public getSessionItem(key: string): any {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		const connection = this.wsService.getConnection(String(socketKey));
		if (!connection.session.has(key)) return null;
		return connection.session.get(key);
	}

	public getConnection(): { socket: WS, request: Request, subscriptions: Array<string>, session: Record<string, any> } {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		return this.wsService.getConnection(socketKey as string);
	}

	public send(message: IWsPacket): void {
		this.socket.send(JSON.stringify(message));
	}

	public sendRaw(message: any): void {
		this.socket.send(message);
	}

	public broadcast(message: IWsPacket): void {
		Object.keys(this.wsService.getConnections()).forEach((key) => {
			this.wsService.getConnection(key).socket.send(JSON.stringify(message));
		});
	}

	public broadcastRaw(message: any): void {
		Object.keys(this.wsService.getConnections()).forEach((key) => {
			this.wsService.getConnection(key).socket.send(message);
		});
	}
}
