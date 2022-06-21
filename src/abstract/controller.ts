import { Inject } from '@symbux/injector';
import { ILogger } from '../interface/implements';
import { Runner } from '../module/runner';
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
	@Inject('turbo.runner') private runner!: Runner;

	public constructor(protected readonly options: Record<string, any>) {}

	/**
	 * Will translate some text from source to target.
	 *
	 * @param source The source language.
	 * @param lang The target language.
	 * @returns string
	 */
	protected _t(source: string, lang: string): string {
		return this.translator.translate(source, lang);
	}

	/**
	 * Will accept a given task name, and attempt to find and launch the task
	 * via the Runner class, if not found, it will throw an error.
	 *
	 * @param name The task name.
	 * @returns Promise<boolean>
	 */
	protected async runTask(name: string): Promise<boolean> {
		if (!this.runner.hasTask(name)) throw new Error('Task not found');
		await this.runner.runTask(name);
		return true;
	}
}
