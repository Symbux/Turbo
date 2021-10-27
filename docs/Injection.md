# Turbo :: Dependency Injection

Before building this library, I built a small and 100% coverage dependency injection
library for this project specifically, but separated into another package for anyone
to use. The framework is fairly basic, and uses a basic principle of getters to change
the response to a get call of a property of your class, this can be used as decorators
or programatically.

Documentation over at the [Symbux Injector](https://github.com/Symbux/Injector#readme) project.

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
