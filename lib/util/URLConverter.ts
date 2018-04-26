import { JsonConverter, JsonCustomConvert } from 'json2typescript';

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
