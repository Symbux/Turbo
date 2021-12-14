import { Inject } from '@symbux/injector';
import { Authentication } from '../module/authentication';
import { ILogger } from '../interface/implements';

/**
 * The abstract service class, this class simply defines the options given
 * when registering the service, you can access them by using `this.options`.
 *
 * @class AbstractService
 * @abstract
 */
export class AbstractService {
	@Inject('logger') protected logger!: ILogger;
	@Inject('turbo.auth') protected auth!: Authentication;

	public constructor(protected readonly options: Record<string, any>) {}
}
