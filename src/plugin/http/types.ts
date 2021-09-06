import { IKeyValue } from '../../interface/generic';

export interface IContext {
	status: number;
	content?: IKeyValue | string;
	headers?: IKeyValue;
}
