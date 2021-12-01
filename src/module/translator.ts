import { ICountryData, ILanguageData, ICountryItem, ILanguageItem } from '../interface/structures';
import { ILogger } from '../interface/implements';
import CountryDataJson from '../data/countries.json';
import LanguageDataJson from '../data/languages.json';
import { sync as glob } from 'glob';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Inject, Injector } from '@symbux/injector';

/**
 * The translator class is used for translating strings of data using pre-created
 * looking up JSON files. All country codes are defined as {languageCode_countryCode}
 * where languageCode is lowercase and the countryCode is uppercase, this allows for
 * the same language but with a localised version of the language.
 *
 * @class Autowire
 * @provides Translator {engine.translator}
 * @injects logger
 */
export class Translator {

	@Inject('logger') private logger!: ILogger;
	private countryData: ICountryData = CountryDataJson;
	private languageData: ILanguageData = LanguageDataJson;
	private translations: Record<string, Record<string, string>> = {};

	/**
	 * Creates an instance of the translation class.
	 *
	 * @param defaultLang The default language to use if the language is not found [default: en_GB].
	 * @param languagesFolder The absolute path to the languages folder.
	 * @constructor
	 */
	public constructor(private defaultLang: string = 'en_GB', private languagesFolder: string) {

		// Register self.
		Injector.register('engine.translator', this);
	}

	/**
	 * Initialises the translation class.
	 *
	 * @returns Promise<void>
	 * @async
	 * @public
	 */
	public async initialise(): Promise<void> {
		this.logger.info('TRANSLATOR', 'Initialising translator.');
		const languageFiles = glob(`${this.languagesFolder}/**/*.json`);
		languageFiles.forEach((file) => {
			const languageCode = file.split('/').pop()?.split('.')[0];
			this.translations[String(languageCode)] = JSON.parse(readFileSync(resolve(this.languagesFolder, file), 'utf8'));
		});
	}

	/**
	 * Translates a string using the given language.
	 *
	 * @param string The string to translate.
	 * @param language The language to use for the translation.
	 * @returns string
	 * @public
	 */
	public translate(source: string, lang: string = this.defaultLang): string {
		if (this.translations[lang] && this.translations[lang][source]) return this.translations[lang][source];
		return source;
	}

	/**
	 * Shorthand version of the `.translate` method.
	 * Translates a string using the given language.
	 *
	 * @param string The string to translate.
	 * @param language The language to use for the translation.
	 * @returns string
	 * @public
	 */
	public _(source: string, lang: string = this.defaultLang): string {
		return this.translate(source, lang);
	}

	/**
	 * Gets the country item for the given country code.
	 *
	 * @param code The country code to get the data for.
	 * @returns ICountryItem
	 * @public
	 */
	public getCountryFromCode(code: string): ICountryItem {
		return this.countryData[code];
	}

	/**
	 * Gets the language item for the given country code.
	 *
	 * @param code The language code to get the data for.
	 * @returns ILanguageItem
	 * @public
	 */
	public getLanguageFromCode(code: string): ILanguageItem {
		return this.languageData[code];
	}
}
