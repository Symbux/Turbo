import * as express from 'express';
import packageJson from '../../../package.json';

/**
 * The response object is a proxy for creating HTTP responses within
 * the framework format, this object exists as part of the abstract
 * controller.
 *
 * @class Http.Response
 * @plugin Http
 */
export class Response {

	/**
	 * This creates a new response with a status code and optional
	 * content and headers.
	 *
	 * @param status Http status code.
	 * @param content The content of the response.
	 * @param headers Optional headers to be sent with the request.
	 * @constructor
	 */
	public constructor(
		private status: number,
		private content?: Record<string, any> | Array<any> | string,
		private headers?: Record<string, any>,
	) {}

	/**
	 * This method will execute a response object and send the
	 * response to the client.
	 *
	 * @param request The request object.
	 * @param response The response object.
	 * @returns void
	 * @public
	 */
	public execute(response: express.Response): void {

		// Define the headers.
		const headers: Record<string, string> = Object.assign({
			Server: `turbo/${packageJson.version}`,
		}, this.headers);

		// Set the headers to the response.
		response.set(headers);

		// Check content and send response.
		if (typeof this.content !== 'object') {
			response
				.status(this.status)
				.send(this.content);
		} else {
			response
				.status(this.status)
				.json(this.content);
		}
	}
}
