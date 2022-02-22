import { Http } from '../../src';

export default class CacheControl implements Http.ICache {
	private cache = new Map<string, any>();

	public async get(key: string): Promise<any> {
		return this.cache.get(key);
	}

	public async set(key: string, value: any): Promise<void> {
		this.cache.set(key, value);
	}

	public async del(key: string): Promise<void> {
		this.cache.delete(key);
	}

	public async clear(): Promise<void> {
		this.cache.clear();
	}
}
