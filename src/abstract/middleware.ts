/**
 * The abstract middleware class, this class simply defines the options given
 * when registering the middleware, you can access them by using `this.options`.
 *
 * @class AbstractMiddleware
 * @abstract
 */
export class AbstractMiddleware {
	public constructor(protected readonly options: Record<string, any>) {}
}
