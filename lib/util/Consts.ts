import got = require('got');

/**
 * Represents the Unix epoch
 *
 * @private
 */
export const DEFAULT_DATE = new Date(0);

/**
 * Represents the user agent used for requests from this package
 *
 * @private
 */
export const USER_AGENT = 'node-derpi/' + require('../../package.json').version;

/**
 * Represents the default Got options used for HTTP requests
 *
 * @private
 */
export const DEFAULT_GOT_OPTS: got.GotJSONOptions = {
	headers: {
		'User-Agent': USER_AGENT
	},
	json: true,
	encoding: 'utf8'
};

/**
 * Represents an HTTP 200 OK response code
 *
 * @private
 */
export const HTTP_200_OK = 200;

/**
 * Represents an HTTP 301 Moved Permanently response code
 *
 * @private
 */
export const HTTP_301_MOVED_PERMANENTLY = 301;
