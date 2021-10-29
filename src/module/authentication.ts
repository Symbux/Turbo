import { Inject, Injector } from '@symbux/injector';
import { DecoratorHelper } from '../helper/decorator';
import { AbstractController } from '../abstract/controller';
import { IGenericContext, IGenericMiddleware, ILogger, IAuthCheck } from '../interface/implements';
import { IAuthResponse } from '../interface/structures';

/**
 * The authentication module is responsible for handling all
 * authentication checks for the application alongside running
 * any middleware, validating the data, and also running any
 * defined authentication checks.
 *
 * This module should be injected to services and should the
 * service is in charge for making sure this is called correctly.
 *
 * @class Authentication
 * @provides Authentication {engine.auth}
 * @injects logger
 */
export class Authentication {

	@Inject('logger') private logger!: ILogger;

	/**
	 * Creates an instance of Authentication.
	 *
	 * @constructor
	 */
	public constructor() {
		Injector.register('engine.auth', this);
	}

	/**
	 * This is the main method for the authentication module, this
	 * is called by the service with the correct data, and will call
	 * any middleware and run any authentication checks.
	 *
	 * @param context The context of the request.
	 * @param controller The controller for that request.
	 * @param method The controller method to call.
	 * @returns IAuthResponse
	 * @async
	 * @public
	 */
	public async handle(context: IGenericContext, controller: AbstractController, method: string): Promise<IAuthResponse> {

		// Firstly get metadata.
		const middlewares: IGenericMiddleware[] = DecoratorHelper.getMetadata('t:auth:middleware', [], controller.constructor);
		const authChecks: IAuthCheck[] = DecoratorHelper.getMetadata('t:auth:checks', [], controller, method);

		// Verify we have middlewares to run.
		if (middlewares.length === 0) return { failed: false, stop: false };

		// Loop and run the middlewares.
		for await (const middleware of middlewares) {

			// Log verbose.
			this.logger.verbose('AUTH', `Running middleware: ${(middleware as any).name} for: ${controller.constructor.name}/${method}.`);

			// Create an instance of the class.
			const middlewareOptions: Record<string, any> = DecoratorHelper.getMetadata('t:options', {}, middleware);
			const instance = new (middleware as any)(middlewareOptions);

			// Run the middleware.
			const shouldExit: boolean = await instance.handle(context);
			if (shouldExit) return { failed: false, stop: true };
		}

		// Check for auth checks.
		if (authChecks.length === 0) return { failed: false, stop: false };

		// Log verbose.
		this.logger.verbose('AUTH', `Running ${authChecks.length} authentication checks for: ${controller.constructor.name}/${method}.`);

		// Loop the auth checks and execute them.
		for (const check of authChecks) {
			const checkStatus = check.func(context.getAuth());
			if (!checkStatus) {
				this.logger.warn('AUTH', `Authentication check failed for: ${controller.constructor.name}/${method} on check type: @Auth.${check.type}().`);
				return { failed: true, stop: true };
			}
		}

		// Fallback to returning true.
		return { failed: false, stop: false };
	}
}
