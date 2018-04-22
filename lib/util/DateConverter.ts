import { JsonConverter, JsonCustomConvert } from 'json2typescript';

export class DateConverter implements JsonCustomConvert<Date> {
	serialize(date: Date): any {
		return date.toISOString();
	}

	deserialize(date: any): Date {
		return new Date(date);
	}
}
