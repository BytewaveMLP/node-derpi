import { JsonConverter, JsonCustomConvert } from 'json2typescript';

/**
 * Converts the no-protocol URLs returned by Derpibooru to HTTPS URLs
 *
 * @private
 * @export
 * @class URLConverter
 * @implements {JsonCustomConvert<String>}
 */
@JsonConverter
export class URLConverter implements JsonCustomConvert<String> {
	serialize(link: string): any {
		return link;
	}

	deserialize(link: any): string {
		if (link === null || link === undefined || link === '') return '';
		return 'https:' + link;
	}
}
