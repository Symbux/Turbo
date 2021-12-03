import { Request } from 'express';
import * as WS from 'ws';
import { WsService } from './service';
import { IPacket, IWsConnection } from './types';
import { Inject } from '@symbux/injector';
import { Translator } from '../../module/translator';

/**
 * Context class for the WS plugin.
 *
 * @class Context
 * @plugin Ws
 */
export class Context {
	@Inject('engine.translator') private translator!: Translator;
	private willTranslate = false;

	/**
	 * Creates instance of context.
	 *
	 * @param request The express request object.
	 * @param socket The websocket instance.
	 * @param wsService The websocket service.
	 * @param packet The packet object.
	 * @constructor
	 */
	public constructor(
		private request: Request,
		private socket: WS,
		private wsService: WsService,
		private packet: IPacket,
		private languages: string[],
	) {}

	/**
	 * Sets the authentication data for the context, usually called
	 * by the authentication middleware.
	 *
	 * @param auth The auth object.
	 * @returns void
	 * @public
	 */
	public setAuth(auth: Record<string, any>): void {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		const connection = this.wsService.getConnection(socketKey as string);
		connection.session.auth = auth;
	}

	/**
	 * Gets the authentication data for the context, usually called
	 * by the authentication checks.
	 *
	 * @returns Record<string, any>
	 * @public
	 */
	public getAuth(): Record<string, any> {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		const connection = this.wsService.getConnection(socketKey as string);
		return connection.session.auth;
	}

	/**
	 * Get's the accepted languages for the request.
	 *
	 * @returns string
	 * @public
	 */
	public getLanguages(): string[] {
		return this.languages;
	}

	/**
	 * Will set a higher ranking language.
	 *
	 * @param lang The language.
	 * @returns void
	 */
	public setLanguage(lang: string): void {
		this.languages.unshift(lang);
	}

	/**
	 * Defaulted to false, when enabled, all data sent
	 * through the socket is run through the translation
	 * module.
	 *
	 * @param status Whether to translate or not.
	 * @returns void
	 */
	public shouldTranslate(status: boolean): void {
		this.willTranslate = status;
	}

	/**
	 * Gets the headers for the request.
	 *
	 * @returns Record<string, string>
	 * @public
	 */
	public getHeaders(): Record<string, string> {
		return Object.keys(this.request.headers).reduce((headers, header) => {
			headers[header] = this.request.headers[header];
			return headers;
		}, {});
	}

	/**
	 * Gets the request query data.
	 *
	 * @returns Record<string, any>
	 * @public
	 */
	public getQuery(): Record<string, any> {
		return this.request.query;
	}

	/**
	 * Gets the request cookies data.
	 *
	 * @returns Record<string, string>
	 * @public
	 */
	public getCookies(): Record<string, string> {
		return this.request.cookies;
	}

	/**
	 * Gets the request params data.
	 *
	 * @returns Record<string, any>
	 * @public
	 */
	public getParams(): Record<string, any> {
		return this.request.params;
	}

	/**
	 * Gets the request body data.
	 *
	 * @returns Record<string, any>
	 * @public
	 */
	public getBody(): Record<string, any> {
		return this.request.body;
	}

	/**
	 * Returns the IP address for the connection.
	 *
	 * @returns string
	 * @public
	 */
	public getIpAddress(): string {
		return this.request.socket.remoteAddress || '';
	}

	/**
	 * Gets the websocket's packet object.
	 *
	 * @returns IPacket
	 * @public
	 */
	public getPacket(): IPacket {
		return this.packet;
	}

	/**
	 * Gets the raw express request object.
	 *
	 * @returns Request
	 * @public
	 */
	public getRaw(): Request {
		return this.request;
	}

	/**
	 * Sets a session key and value to the connection's session.
	 *
	 * @param key The session key name.
	 * @param value The session value for that key.
	 * @returns void
	 * @public
	 */
	public setSessionItem(key: string, value: any): void {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		const connection = this.wsService.getConnection(String(socketKey));
		connection.session.set(key, value);
	}

	/**
	 * Gets a session key value from the connection's session.
	 *
	 * @param key The session key name.
	 * @returns any
	 * @public
	 */
	public getSessionItem(key: string): any {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		const connection = this.wsService.getConnection(String(socketKey));
		if (!connection.session.has(key)) return null;
		return connection.session.get(key);
	}

	/**
	 * Get the current connnection.
	 *
	 * @returns { socket: WS, request: Request, subscriptions: Array<string>, session: Record<string, any> }
	 * @public
	 */
	public getConnection(): IWsConnection {
		const headers = this.request.headers;
		const socketKey = headers['sec-websocket-key'];
		return this.wsService.getConnection(socketKey as string);
	}

	/**
	 * Will accept the source data and translate it based
	 * on the accepted translations.
	 *
	 * @param source The source content.
	 * @returns string
	 */
	public translate(source: string): string {
		return this.translator.autoTranslate(source, this.languages);
	}

	/**
	 * Will send a packet to the client.
	 *
	 * @param message The packet to send.
	 * @public
	 */
	public send(message: IPacket): void {
		this.socket.send(
			this.willTranslate
				? this.translate(JSON.stringify(message))
				: JSON.stringify(message),
		);
	}

	/**
	 * Sends a raw message to the client.
	 *
	 * @param message Raw content to send (should be a string).
	 * @public
	 */
	public sendRaw(message: any): void {
		this.socket.send(
			this.willTranslate
				? this.translate(JSON.stringify(message))
				: JSON.stringify(message),
		);
	}

	/**
	 * Will broadcast a packet to all connected clients.
	 * **Note broadcasts are not translated.**
	 *
	 * @param message The packet to send.
	 * @public
	 */
	public broadcast(message: IPacket): void {
		this.wsService.broadcast(message);
	}

	/**
	 * Broadcasts a raw message all connected clients.
	 * **Note broadcasts are not translated.**
	 *
	 * @param message Raw content to send (should be a string).
	 * @public
	 */
	public broadcastRaw(message: any): void {
		this.wsService.broadcastRaw(message);
	}
}
