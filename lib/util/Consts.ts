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
 * Represents the default request options used for HTTP requests
 *
 * @private
 */
export const DEFAULT_REQUEST_OPTS = {
	'json': true,
	'headers': {
		'User-Agent': USER_AGENT
	}
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
