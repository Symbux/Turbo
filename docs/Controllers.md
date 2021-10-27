# Turbo :: Controllers

Controllers are a core feature of the Turbo engine. They are responsible for
handling incoming events from services and responding, this is where you would
define 100% of your business logic.

The way you create your controller depends on the plugin you use, the built-in
plugins available with the engine are the `Http` and `WebSocket` plugins.

Remember you can use fibres from within a controller to call on CPU-intensive tasks
taking it out of the main process, and preventing your application from blocking.

> Has full application scope, unlike fibres.

<br>

## Controller Example (Http Plugin)

```typescript
import { AbstractController, Http } from '@symbux/turbo';

@Http.Controller('/')
export default class HomeController extends AbstractController {

	@Http.Get('/')
	public async index(): Promise<Http.Response> {
		return new Http.Response(200, {
			message: 'Hello, World!',
		});
	}
}
```

The above creates a controller, using namespaced decorators, the first decorator
comes from the Http plugin, and is used to define the class as a controller for
the that plugin, alongside the argument is the controller namespaced path, in the
above example this is `/`, so all methods defined in the controller will be namespaced
with the `/`.

The second decorator, also coming from the Http plugin, is used to define the method
as a GET request, for the given path, the Http plugin offers methods for all common
REST-based HTTP methods, such as `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`.

Based on the above decorators, that means the function `index()` will be called
when a GET request is made to `/`. ALL methods defined in the controller should be
async. In the Http plugin, controllers are given an instance of the `Http.Context`
class for pulling data from the request, and expect an instance of `Http.Response` -
to find out more information, look at the Http plugin documentation.

> All paths are normalised, meaning the namespace being `/` and the method being `/`
would resolve to `/` **not** `//`.

<br>

# Controller Example (WebSocket Plugin)

```typescript
import { AbstractController, Ws } from '@symbux/turbo';

@Ws.Controller('api')
export default class ApiController extends AbstractController {

	@Ws.Action()
	public async index(context: Ws.Context): Promise<void> {
		context.send({
			command: 'hello',
			content: {
				message: 'Hello World!',
				quickmaths: this.misc.add(1, 2),
			},
		});
	}
}
```

As you can see from the above, instead of using the Http namespaced decorators, we
use the WebSocket namespaced decorators, the first decorator is used to define the
class as a controller for the WebSocket plugin, alongside defining a namespace, and
the second decorator is used to define the class method as an action for the given
namespace.

So when connecting to the WebSocket, you would connect using the configured path,
then you would make a request in a specific structure, see the WebSocket plugin
documentation for more information - to expand slightly on the request, the `command`
would be `api/index`.

The context is an instance of the `Ws.Context` class, which is used to access the
WebSocket data, alongside accessing things like broadcasting and more.
