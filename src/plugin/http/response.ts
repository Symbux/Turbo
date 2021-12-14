import { Inject } from '@symbux/injector';
import { Translator } from '../../module/translator';
import * as express from 'express';
import { Registry } from '../../module/registry';
import { Context } from './context';

/**
 * The response object is a proxy for creating HTTP responses within
 * the framework format, this object exists as part of the abstract
 * controller.
 *
 * @class Http.Response
 * @plugin Http
 */
export class Response {
	@Inject('turbo.translator') private translator!: Translator;
	private willTranslate = false;

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
	 * This will enable translations on this response, by default
	 * this is set to false, as this could affect serialisation.
	 *
	 * To use auto translation, you must wrap strings you want to
	 * be translated with `_t('string')`.
	 *
	 * Example: `Hello, _t('how are you?')`
	 *
	 * @param shouldTranslate Whether to translate or not.
	 * @public
	 */
	public shouldTranslate(status: boolean): void {
		this.willTranslate = status;
	}

	/**
	 * Will read the response through to the context and
	 * find the accepted languages and return them.
	 *
	 * @param response The express response.
	 * @returns string[]
	 * @public
	 */
	private getLanguages(response: express.Response): string[] {
		const context = (response as any).req.ENGINE_CONTEXT as Context;
		return context.getLanguages();
	}

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
			Server: `turbo/${Registry.get('turbo.version')}`,
		}, this.headers);

		// Set the headers to the response.
		response.set(headers);

		// If translations, run the request through translations.
		if (this.willTranslate && this.content) {
			let translatedData: string | Record<string, any> | Array<any>;

			// Set language.
			const toLanguage = this.getLanguages(response);

			// Check content type.
			if (typeof this.content === 'object') {
				translatedData = JSON.stringify(this.content);
				translatedData = this.translator.autoTranslate(JSON.stringify(this.content), toLanguage);
				translatedData = JSON.parse(translatedData);
			} else {
				translatedData = this.translator.autoTranslate(this.content, toLanguage);
			}

			// Set the data back.
			this.content = translatedData;
		}

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
