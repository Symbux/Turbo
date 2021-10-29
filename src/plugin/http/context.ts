import { Request, Response, NextFunction } from 'express';

export class Context {
	private auth: Record<string, any> = {};

	public constructor(private request: Request, private response: Response, private nextFunction?: NextFunction ) {}

	public setAuth(auth: Record<string, any>): void {
		this.auth = auth;
	}

	public getAuth(): Record<string, any> {
		return this.auth;
	}

	public setHeader(key: string, value: string): void {
		this.response.setHeader(key, value);
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

	public next(): void {
		if (this.nextFunction) {
			this.nextFunction();
		}
	}

	public getRaw(): Request {
		return this.request;
	}

	public getResponse(): Response {
		return this.response;
	}
}
