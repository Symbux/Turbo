import { Inject, Injector } from '@symbux/injector';
import { DecoratorHelper } from '../helper/decorator';
import { AbstractController } from '../abstract/controller';
import { IGenericContext, IGenericMiddleware, ILogger, IAuthCheck } from '../interface/implements';

export class Authentication {

	@Inject('logger') private logger!: ILogger;

	public constructor() {
		Injector.register('engine.auth', this);
	}

	public async handle(context: IGenericContext, controller: AbstractController, method: string): Promise<boolean> {

		// Firstly get metadata.
		const middlewares: IGenericMiddleware[] = DecoratorHelper.getMetadata('t:auth:middleware', [], controller.constructor);
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
			await instance.handle(context);
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
