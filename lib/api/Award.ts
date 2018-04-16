import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Award {
	/**
	 * The title of the award
	 *
	 * @type {string}
	 * @memberof Award
	 */
	@JsonProperty('title', String)
	public title: string = '';

	/**
	 * The internal ID of the award
	 *
	 * @type {number}
	 * @memberof Award
	 */
	@JsonProperty('id', Number)
	public id: number = -1;

	/**
	 * The award's description, if any
	 *
	 * @type {string?}
	 * @memberof Award
	 */
	@JsonProperty('label', String)
	public label: string = '';

	@JsonProperty('awarded_on', String)
	private _awarded: string = '1970-01-01T00:00:00.000Z';

	/**
	 * The date the award was given on
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Award
	 */
	get awarded(): Date {
		return new Date(this._awarded);
	}

	@JsonProperty('image_url', String)
	private _image: string = '';

	/**
	 * The image URL for the ward
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Award
	 */
	get image(): string {
		return 'https:' + this._image;
	}
}
