import { JsonConverter, JsonCustomConvert } from 'json2typescript';

/**
 * Converts ISO-8601 strings to Date objects
 *
 * @private
 * @export
 * @class DateConverter
 * @implements {JsonCustomConvert<Date>}
 */
@JsonConverter
export class DateConverter implements JsonCustomConvert<Date> {
	serialize(date: Date): any {
		return date.toISOString();
	}

	deserialize(date: any): Date {
		return new Date(date);
	}
}
