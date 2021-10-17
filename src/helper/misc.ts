/**
 * Translates seconds into human readable format of seconds,
 * minutes, hours, days, and years.
 * 
 * @param number The number of seconds to be processed
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