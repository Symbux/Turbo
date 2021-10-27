import { Fibre, Expose } from '../../src';

@Fibre('example', __filename)
export class ExampleFibre {

	@Expose()
	public async getName(name: string): Promise<string> {
		return `Hello, ${name}!`;
	}
}
