/**
 * Translates seconds into human readable format of seconds,
 * minutes, hours, days, and years.
 *
 * @param seconds The number of seconds to be processed
 * @return string
 */
export function durationToHuman(seconds: number): string {
	const levels = [
		[Math.floor(seconds / 31536000), 'years'],
		[Math.floor((seconds % 31536000) / 86400), 'days'],
		[Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
		[Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
		[(((seconds % 31536000) % 86400) % 3600) % 60, 'seconds'],
	];

	let returntext = '';
	for (let i = 0, max = levels.length; i < max; i++) {
		if ( levels[i][0] === 0 ) continue;
		returntext += ' ' + levels[i][0] + ' ' + (levels[i][0] === 1 ? String(levels[i][1]).substr(0, String(levels[i][1]).length-1): levels[i][1]);
	}

	return returntext.trim();
}

/**
 * This function is used to capitalise a string.
 *
 * @param value The string to capitalise.
 * @returns string
 */
export function capitalise(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Will accept a header for "accept-string" and process
 * the country code out of it.
 *
 * @param value The header value for accept-language.
 * @returns string
 */
export function processLanguageHeader(value: string): string {
	return value.replace(/[^a-zA-Z0-9-]/g, '').substring(0, 5);
}

/**
 * Will check if the given headers object contains the
 * accept-language header.
 *
 * @param value The headers.
 * @returns boolean
 */
export function hasLanguageHeader(value: Record<string, string>): boolean {
	return Object.keys(value).some(key => key.toLowerCase().startsWith('accept-language'));
}

/**
 * Will check if the language header exists, if not it will
 * return false.
 *
 * @param value The headers.
 * @returns string | boolean
 */
export function getLanguageHeader(value: Record<string, string>): string | boolean {
	if (hasLanguageHeader(value)) {
		let langHeader = value['accept-language'] || value['Accept-Language'];
		langHeader = langHeader.split('-')[0].toLowerCase().substring(0, 2) + '-' + langHeader.split('-')[1].toUpperCase().substring(0, 2);
		return langHeader;
	}
	return false;
}
