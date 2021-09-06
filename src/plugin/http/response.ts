import { IContext } from './types';
import { IKeyValue } from '../../interface/generic';

/**
 * The response object is a proxy for creating HTTP responses within
 * the framework format, this object exists as part of the abstract
 * controller.
 * 
 * @class Http.Response
 */
export class Response {

	/**
	 * This creates a new response with a status code and optional
	 * content and headers.
	 * 
	 * @param status Http status code.
	 * @param content The content of the response.
	 * @param headers Optional headers to be sent with the request.
	 */
	public constructor(
		private status: number,
		private content?: IKeyValue | Array<any> | string,
		private headers?: IKeyValue,
	) {}

	/**
	 * This returns the status code of the response alongside any
	 * content and headers and turns it into a userful object.
	 * 
	 * @returns IContext
	 */
	public toJson(): IContext {
		return {
			status: this.status,
			content: typeof this.content === 'string' ? this.content : JSON.stringify(this.content),
			headers: this.headers,
		}
	}
}
