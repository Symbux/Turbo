import { Fibre, Expose } from '..';

@Fibre('demo', 'thread', __filename)
export class DemoFibre {

	@Expose()
	public async name(name: string): Promise<string> {
		return `Hello, ${name}!`;
	}
}
