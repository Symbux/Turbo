import { Inject } from '@symbux/injector';
import { ILogger } from '../interface/implements';
import { Translator } from '../module/translator';

/**
 * The abstract controller class, this class simply defines the options given
 * when registering the controller, you can access them by using `this.options`.
 *
 * @class AbstractController
 * @abstract
 */
export class AbstractController {
	@Inject('logger') protected logger!: ILogger;
	@Inject('turbo.translator') protected translator!: Translator;

	public constructor(protected readonly options: Record<string, any>) {}

	protected _t(source: string, lang: string): string {
		return this.translator.translate(source, lang);
	}
}
