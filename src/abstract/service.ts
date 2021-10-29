/**
 * The abstract service class, this class simply defines the options given
 * when registering the service, you can access them by using `this.options`.
 *
 * @class AbstractService
 * @abstract
 */
export class AbstractService {
	public constructor(protected readonly options: Record<string, any>) {}
}
