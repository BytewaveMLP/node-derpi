import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';
import { URLConverter } from '../util/URLConverter';
import { DateConverter } from '../util/DateConverter';

/**
 * Represents the various awards (badges) on user profiles
 *
 * @export
 * @class Award
 */
@JsonObject
export class Award {
	/**
	 * The title of the award
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Award
	 */
	@JsonProperty('title', String)
	public readonly title: string = '';

	/**
	 * The internal ID of the award
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Award
	 */
	@JsonProperty('id', Number)
	public readonly id: number = 0;

	/**
	 * The award's description, if any
	 *
	 * @readonly
	 * @type {string?}
	 * @memberof Award
	 */
	@JsonProperty('label', String)
	public readonly label: string = '';

	/**
	 * The date this award was achieved by the user
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Award
	 */
	@JsonProperty('awarded_on', DateConverter)
	public readonly awarded: Date = Consts.DEFAULT_DATE;

	/**
	 * The image URL for the ward
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Award
	 */
	@JsonProperty('image_url', URLConverter)
	public readonly image: string = '';
}
