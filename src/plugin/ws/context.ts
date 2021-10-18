import { Request } from 'express';
import * as WS from 'ws';
import { WsService } from './service';

export class Context {
	private auth: Record<string, any> = {};

	public constructor(
		private request: Request,
		private socket: WS,
		private wsService: WsService,
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

	public getRaw(): Request {
		return this.request;
	}

	public send(message: Record<string, any> | Array<any> | string): void {
		if (typeof message === 'string') {
			this.socket.send(message);
		} else {
			this.socket.send(JSON.stringify(message));
		}
	}

	public getConnection(): { socket: WS, request: Request, subscriptions: Array<string>, session: Record<string, any> } {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		return this.wsService.getConnection(socketKey as string);
	}

	public broadcast(message: Record<string, any> | Array<any> | string): void {
		if (typeof message === 'string') {
			Object.keys(this.wsService.getConnections()).forEach((key) => {
				this.wsService.getConnection(key).socket.send(message);
			});
		} else {
			Object.keys(this.wsService.getConnections()).forEach((key) => {
				this.wsService.getConnection(key).socket.send(JSON.stringify(message));
			});
		}
	}
}
