import { Request, Response, NextFunction } from 'express';

/**
 * Context class for the HTTP plugin.
 *
 * @class Context
 * @plugin Http
 */
export class Context {
	private auth: Record<string, any> = {};
	private languages: string[];

	/**
	 * Creates instance of context.
	 *
	 * @param request The express request object.
	 * @param response The express response object.
	 * @param nextFunction The express next function.
	 * @constructor
	 */
	public constructor(
		private request: Request,
		private response: Response,
		private nextFunction?: NextFunction,
	) {
		this.languages = request.acceptsLanguages();
		(this.request as any).ENGINE_CONTEXT = this;
	}

	/**
	 * Sets the authentication data for the context, usually called
	 * by the authentication middleware.
	 *
	 * @param auth The auth object.
	 * @returns void
	 * @public
	 */
	public setAuth(auth: Record<string, any>): void {
		this.auth = auth;
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
	 * Gets the authentication data for the context, usually called
	 * by the authentication checks.
	 *
	 * @returns Record<string, any>
	 * @public
	 */
	public getAuth(): Record<string, any> {
		return this.auth;
	}

	/**
	 * Sets headers to the response for this context.
	 *
	 * @param key The header name.
	 * @param value The header value.
	 * @returns void
	 * @public
	 */
	public setHeader(key: string, value: string): void {
		this.response.setHeader(key, value);
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
	 * Calls the next method if existing.
	 *
	 * @returns void
	 * @public
	 */
	public next(): void {
		if (this.nextFunction) {
			this.nextFunction();
		}
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
	 * Gets the raw express response object.
	 *
	 * @returns Response
	 * @public
	 */
	public getResponse(): Response {
		return this.response;
	}
}
