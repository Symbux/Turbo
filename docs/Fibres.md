# Turbo :: Fibres

A fibre is another name for a thread, a fibre allows you to create a class, in
a normal way, which internally proxies all requests out to a spawned thread, which
will do the work and respond with a response.

Fibres are useful for things like:
* CPU-intensive operations (image manipulation, etc.),
* Bulk processing (like sending emails),
* I/O-intensive operations (like scanning and processing files),

## Usage

```typescript
import { Fibre, Expose } from '../../src';

@Fibre('example', __filename, { expiry: 1, warmup: true })
export class ExampleFibre {

	@Expose()
	public async getName(name: string): Promise<string> {
		return `Hello, ${name}!`;
	}
}
```

A fibre is a class, which is decorated with the `@Fibre` decorator, and behind the
scenes will proxy all calls to an underlying thread/worker.

The `@Fibre` decorator takes the following parameters:

* `name`: The name of the fibre, this is used to identify the fibre in the logs.
* `path`: The path to the file that contains the fibre, best to use the `__filename` built-in.
* `options`: An object containing the options for the fibre, available options:
	* `expiry`: The amount of time in minutes that the fibre will be cached for [default: 5], use `0` to disable expiry.
	* `warmup`: Whether or not the fibre should be warmed up when spawned, preventing waiting for the first request, but note that fibres are killed if the `expiry` option is set.

All methods you wish to expose to a fibre must be decorated with the `@Expose` method,
this will tell the Fibre manager to allow those methods to be called from within the
thread, this is done primarily for safety reasons. You can of course access non-exposed
methods from a fibre class directly as if they were normal methods, and from within an
exposed method, you can call any method from the class, due to the whole class being
imported into the worker, instead of just that method.
