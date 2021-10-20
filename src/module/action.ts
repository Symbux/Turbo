import { transpileModule, ModuleKind } from 'typescript';
import { spawn, BlobWorker, Thread } from 'threads';
import { resolve } from 'path';
import { Inject } from '@symbux/injector';
import { IOptions } from '../interface/options';

export class Action {

	@Inject('engine.options') private options!: IOptions;
	private instance: any;
	private path: string;
	private threadBase = `
		import { expose } from 'threads/worker';
		import * as module from '{{modulePath}}';
		expose(module);
	`;
	private compileOptions = {
		compilerOptions: {
			module: ModuleKind.CommonJS,
		},
	};

	public constructor(private name: string) {
		this.path = this.resolveName(name);
	}

	public async init(): Promise<void> {

		// Define the
		this.path = resolve(__dirname, 'abc.ts');

		const output = transpileModule(this.threadBase.replace('{{modulePath}}', this.path), this.compileOptions);
		const worker = await spawn(BlobWorker.fromText(output.outputText));
		console.log(await worker.foo(4));
		Thread.terminate(worker);

		// let workerContents: string;
		// if (this.path.endsWith('.ts')) {
		// 	workerContents = transpileModule(await readFile(this.path, 'utf8'), this.compileOptions);
		// this.instance = spawn(new BlobWorker(await import(this.path)));
	}

	private resolveName(name: string): string {
		return resolve(process.cwd(), name.replace('@', process.cwd()));
		return name;
	}
}
