import { Inject, Injector } from '@symbux/injector';
import { DecoratorHelper } from '../helper/decorator';
import { AbstractController } from '../abstract/controller';
import { IGenericContext, IGenericMiddleware, ILogger, IAuthCheck } from '../interface/implements';
import { Registry } from './registry';

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
 * @provides Authentication {turbo.auth}
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
		Injector.register('turbo.auth', this);
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
	public async handle(type: string, context: IGenericContext, controller: AbstractController, method: string): Promise<boolean> {

		// Define the middlewars.
		const middlewares: IGenericContext[] = [];

		// Firstly get metadata.
		const classMiddlewares: IGenericMiddleware[] = DecoratorHelper.getMetadata('t:auth:middleware', [], controller.constructor);
		if (classMiddlewares && Array.isArray(classMiddlewares)) middlewares.push(...(classMiddlewares as any));

		// Check for service middlewares.
		const serviceMiddlewares: IGenericMiddleware[] = Registry.getMiddleware(type);
		if (serviceMiddlewares && Array.isArray(serviceMiddlewares)) middlewares.push(...(serviceMiddlewares as any));

		// Check for global middlewares.
		const globalMiddlewares: IGenericMiddleware[] = Registry.getMiddleware('global');
		if (globalMiddlewares && Array.isArray(globalMiddlewares)) middlewares.push(...(globalMiddlewares as any));

		// Define the auth checks.
		const authChecks: IAuthCheck[] = DecoratorHelper.getMetadata('t:auth:checks', [], controller, method);

		// Verify we have middlewares to run.
		if (middlewares.length === 0) return true;

		// Loop and run the middlewares.
		for await (const middleware of middlewares) {

			// Log verbose.
			this.logger.verbose('AUTH', `Running middleware: ${(middleware as any).name} for: ${controller.constructor.name}/${method}.`);

			// Create an instance of the class.
			const middlewareOptions: Record<string, any> = DecoratorHelper.getMetadata('t:options', {}, middleware);
			const instance = new (middleware as any)(middlewareOptions);

			// Run the middleware.
			const shouldContinue: boolean = await instance.handle(context);
			if (!shouldContinue) return false;
		}

		// Check for auth checks.
		if (authChecks.length === 0) return true;

		// Log verbose.
		this.logger.verbose('AUTH', `Running ${authChecks.length} authentication checks for: ${controller.constructor.name}/${method}.`);

		// Loop the auth checks and execute them.
		for (const check of authChecks) {
			const checkStatus = check.func(context.getAuth());
			if (!checkStatus) {
				this.logger.warn('AUTH', `Authentication check failed for: ${controller.constructor.name}/${method} on check type: @Auth.${check.type}().`);
				return false;
			}
		}

		// Fallback to returning true.
		return true;
	}
}
