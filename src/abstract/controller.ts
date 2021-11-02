import { Inject } from '@symbux/injector';
import { ILogger } from '../interface/implements';

/**
 * The abstract controller class, this class simply defines the options given
 * when registering the controller, you can access them by using `this.options`.
 *
 * @class AbstractController
 * @abstract
 */
export class AbstractController {

	@Inject('logger') protected logger!: ILogger;

	public constructor(protected readonly options: Record<string, any>) {}
}
