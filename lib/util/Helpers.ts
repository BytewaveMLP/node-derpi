/**
 * Slugifies a URL parameter in the same way Derpibooru does, for fetching tags
 *
 * @export
 * @param {string} param The parameter to slugify
 */
export function slugify(param: string) {
	return param
		.replace('-', '-dash-')
		.replace('/', '-fwslash-')
		.replace('\\', '-bwslash-')
		.replace(':', '-colon-')
		.replace('.', '-dot-')
		.replace('+', '-plus');
}
