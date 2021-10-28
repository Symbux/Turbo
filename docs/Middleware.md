# Turbo :: Middleware

Turbo offers a custom approach to middleware (for various reasons). Middleware
can be assigned to a controller as well as a specific action/route. When a middleware
is assigned to a controller, it will be executed for all actions in that controller.
When a middleware is assigned to a specific action/route, it will only be executed
for that action/route.

Middleware's are tightly linked to the Auth system, see Authentication docs file for
more information regarding how they work together, for using things like global
middlewares for all requests, you are able to register them as globals instead,
which can be done by setting the last parameter to the decorator as `true`,
i.e. `@Middleware('global.auth', {}, true)`. Please be aware that defining a
middleware to global might be useful for certain things, but it means that you
will need to support all plugins you install, we recommend you to only create
middlewares for a single service if you want to use them globally, which can be
done by specifically saying what services this middleware relates to, by defining
the service identifier instead of `true` as the last parameter,
i.e. `@Middleware('auth', {}, 'http')`.

> Has full application scope, unlike fibres.

<br>

## Usage

```typescript
import { Middleware, Http } from '@symbux/turbo';

@Middleware('some.test')
export default class SomeTestMiddleware implements Http.Middleware {
	public async handle(context: Http.Context): Promise<void> {
		context.setAuth({
			name: 'John Doe',
			email: 'john.doe@example.com',
			roles: ['admin', 'user'],
		});
	}
}
```

The above middleware will need to be included to a controller, here is an example:

```typescript
import { Controller, Http, Auth } from '@symbux/turbo';

@Http.Controller('/')
@Auth.Use('some.test')
export default HomeController extends AbstractController {
	//...
}
```

If you would rather simply say this middleware can be used on ALL http requests, you
can do the following:

```typescript
import { Middleware, Http } from '@symbux/turbo';

@Middleware('some.test', {}, 'http')
export default class SomeTestMiddleware implements Http.Middleware {
	public async handle(context: Http.Context): Promise<void> {
		context.setAuth({
			name: 'John Doe',
			email: 'john.doe@example.com',
			roles: ['admin', 'user'],
		});
	}
}
```

The above changes the middleware params, to add an empty options object, but the main
part is we define the last param as `http`, each service should define a unique identifier,
which can be used to scope which services this middleware is allowed to be used with.
