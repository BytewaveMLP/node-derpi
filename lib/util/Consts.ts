export const DEFAULT_DATE = new Date(0);

export const USER_AGENT = 'node-derpi/' + require('../../package.json').version;
export const DEFAULT_REQUEST_OPTS = {
	'json': true,
	'headers': {
		'User-Agent': USER_AGENT
	}
};

export const HTTP_200_OK                = 200;
export const HTTP_301_MOVED_PERMANENTLY = 301;
