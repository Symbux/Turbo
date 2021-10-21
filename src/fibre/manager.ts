import { FibreItem, FibreThread } from '../interface/fibre';
import { spawn, BlobWorker } from 'threads';
import { Registry } from '../module/registry';
import { transpileModule, ModuleKind } from 'typescript';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

export class FibreManager {
	public static fibres: Map<string, FibreItem> = new Map();
	public static tsOptions = {compilerOptions: {module: ModuleKind.CommonJS}};

	public static hasFibre(name: string): boolean {
		return this.fibres.has(this.resolveName(name));
	}

	public static getFibre(name: string): FibreItem | undefined {
		return this.fibres.get(this.resolveName(name));
	}

	public static setFibre(fibre: FibreItem): void {
		this.fibres.set(this.resolveName(fibre.name), fibre);
	}

	public static deleteFibre(name: string): void {
		this.fibres.delete(this.resolveName(name));
	}

	public static async createFibre(path: string): Promise<FibreThread> {
		const baseModuleContent = await this.getFibreBase(path);
		const worker = await spawn(
			Registry.get('engine.mode') === 'main'
				? BlobWorker.fromText(baseModuleContent)
				: BlobWorker.fromText(transpileModule(baseModuleContent, this.tsOptions).outputText),
		);
		return worker;
	}

	public static async getFibreBase(path: string): Promise<string> {
		console.log('getFibreBase', path);
		const engineMode = Registry.get('engine.mode');
		const fibreBaseModulePath = engineMode === 'development'
			? resolve(__dirname, './base.ts')
			: resolve(__dirname, './base.js');
		return (await readFile(fibreBaseModulePath)).toString();
	}

	public static resolveName(name: string): string {
		return name
			.replace(/\s/g, '')
			.replace(/[^a-z0-9]/gmi, '');
	}
}
