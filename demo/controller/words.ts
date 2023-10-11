import { Inject } from '@symbux/injector';
import { PrismaClient } from '../../src';
import { AbstractController, Http } from '../../src';

@Http.Controller('/words')
export default class WordsController extends AbstractController {
	@Inject() private prisma!: PrismaClient;

	@Http.Get('/')
	public async index(): Promise<Http.Response> {
		const words = await this.prisma.word.findMany();
		return new Http.Response(200, words);
	}

	@Http.Get('/:word')
	public async saveWord(context: Http.Context): Promise<Http.Response> {
		const word = context.getParams().word;
		const newWord = await this.prisma.word.create({
			data: { word },
		});
		return new Http.Response(200, newWord);
	}
}
