# Turbo :: Dependency Injection

Before building this library, I built a small and 100% coverage dependency injection
library for this project specifically, but separated into another package for anyone
to use. The framework is fairly basic, and uses a basic principle of getters to change
the response to a get call of a property of your class, this can be used as decorators
or programatically.

Documentation over at the [Symbux Injector](https://github.com/Symbux/Injector#readme) project.

<br>

## Basic Usage

```typescript
import { Provide, Inject } from '@symbux/injector';

@Provide() // Give it a name instead of using class name.
export class NumberHelper {
	public multiply(num1: number, num2: number): number {
		return num1 * num2;
	}
}

export class BusinessLogic {

	@Inject() helper!: NumberHelper; // When no name is given, will resolve on the class name.

	public main(): void {
		console.log(this.helper.multiply(5, 5));
	}
}
```

<br>

## Built-in Provides

Below is a list of built in provides, these are the ones that are automatically addded
when the engine starts. These are the ones that are active instances, things like the
`FibreManager` class is static, and can be imported and called as is.

| Name | Description | Type |
|------|-------------|------|
| `engine.core` | The main instance of the Turbo engine. | `Engine` |
| `engine.options` | The options object used to start the engine. | `IOptions` |
| `engine.runner` | The task runner class instance. | `Runner` |
| `engine.services` | The services manager class instance. | `Services` |
| `engine.plugin.http` | The instance of the HttpPlugin's service. | `Http.Service` |
| `engine.plugin.http.options` | The HttpPlugin's options. | `Http.IOptions` |
| `engine.plugin.ws` | The instance of the WsPlugin's service. | `Ws.Service` |
| `engine.plugin.ws.options` | The WsPlugin's options. | `Ws.IOptions` |
