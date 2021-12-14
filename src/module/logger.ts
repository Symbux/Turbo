import chalk from 'chalk';
import { Provide } from '@symbux/injector';
import { Registry } from './registry';
import { ILogger } from '../interface/implements';

/**
 * The built-in simple logger, that simply routes all logs to the Console API with colours.
 */
@Provide('turbo.logger')
@Provide('logger')
export class Logger implements ILogger {

	/**
	 * Generic log method that takes a level and will route to the
	 * right method based on the level; passing over any given data.
	 *
	 * @param level The level of the log.
	 * @param title The title of the output.
	 * @param message The contents of the output.
	 * @param err An error object (optional).
	 * @returns void.
	 * @public
	 */
	public log(level: 'info' | 'warn' | 'error' | 'verbose' | 'debug', title: string, message: string, err?: Error): void {
		if (!this.hasLogLevel(level)) return;
		if (typeof this[level] === 'undefined' || !(this[level] instanceof Function)) return;
		this[level](title, message, err);
	}

	/**
	 * This method is to output information, like connection requests, or
	 * other, you should use the other methods to give more in-depth output.
	 *
	 * @param title The title of the output.
	 * @param message The contents of the output.
	 * @returns void.
	 * @public
	 */
	public info(title: string, message: string): void {
		if (!this.hasLogLevel('info')) return;
		console.log(this.format(title, message, 'info'));
	}

	/**
	 * This method is to output warnings, like connection closes, or
	 * other, you should use the other methods to give more in-depth output.
	 *
	 * @param title The title of the output.
	 * @param message The contents of the output.
	 * @returns void.
	 * @public
	 */
	public warn(title: string, message: string): void {
		if (!this.hasLogLevel('warn')) return;
		console.log(this.format(title, message, 'warn'));
	}

	/**
	 * This method is to output errors and optionally takes an error
	 * object, the built in logger is simple, but custom loggers can
	 * do more with that error message, like outputting the stack trace.
	 *
	 * @param title The title of the output.
	 * @param message The contents of the output.
	 * @param err The error object.
	 * @returns void.
	 * @public
	 */
	public error(title: string, message: string, err?: Error): void {
		if (!this.hasLogLevel('error')) return;
		console.log(this.format(title, message, 'error', err));
	}

	/**
	 * This method is to output more verbose data, and is built for outputting
	 * objects and in general more information that would be useful.
	 *
	 * @param title The title of the output.
	 * @param content The contents of the output.
	 * @param err The error object.
	 * @returns void.
	 * @public
	 */
	public verbose(title: string, message: string, err?: Error): void {
		if (!this.hasLogLevel('verbose')) return;
		console.log(this.format(title, message, 'verbose', err));
	}

	/**
	 * This method is to output debug information and should be used in conjunction
	 * with objects and more useful data that you can output, like outputting failing
	 * queries or other.
	 *
	 * @param title The title of the output.
	 * @param content The contents of the output.
	 * @param err The error object.
	 * @returns void.
	 * @public
	 */
	public debug(title: string, content: any, err?: Error): void {
		if (!this.hasLogLevel('debug')) return;
		console.log(this.format(title, JSON.stringify(content), 'debug', err));
	}

	/**
	 * This method will simply format the message to be pretty and nice
	 * to read or can be used to customise more the output of certain output
	 * levels.
	 *
	 * @param title The title of the output.
	 * @param message The contents of the output.
	 * @param err The error object.
	 * @returns void.
	 * @protected
	 */
	protected format(title: string, message: string, level: 'info' | 'warn' | 'error' | 'verbose' | 'debug', err?: Error): string {
		const currentDate = new Date().toISOString();

		// Get the level text.
		let levelText = level.toUpperCase();
		if (['info', 'debug', 'verbose'].indexOf(level) > -1) levelText = chalk.blue(levelText);
		if (level === 'warn') levelText = chalk.yellow(levelText);
		if (level === 'error') levelText = chalk.red(levelText);

		// Return the formatted string.
		return `${chalk.grey(currentDate)} ${chalk.green('[')}${title.toUpperCase()}${chalk.green(']:')} ${levelText} ${chalk.cyan(message)}${err ? ` - ${chalk.red(err.message)}` : ''}`;
	}

	/**
	 * Checks whether the level is allowed to be logged.
	 *
	 * @param level The level of the log.
	 * @returns boolean.
	 * @protected
	 */
	protected hasLogLevel(level: string): boolean {
		const levels: string[] = Registry.get('turbo.logger.levels') || [];
		return levels.includes(level);
	}
}
