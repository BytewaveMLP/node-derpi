import { User } from './User';
import { Tag } from './Tag';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from '../util/DateConverter';
import { Fetch } from '..';

/**
 * Represents an artist link on a user profile
 *
 * @export
 * @class Link
 */
@JsonObject
export class Link {
	/**
	 * The current state of the link
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Link
	 */
	@JsonProperty('state', String)
	public readonly state: string = ''; // TODO: verified is known, what about other states?

	/**
	 * When the link was first established
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Link
	 */
	@JsonProperty('created_at', DateConverter)
	public readonly created: Date = Consts.DEFAULT_DATE;

	/**
	 * The internal ID of the user associated with this link
	 *
	 * @readonly
	 * @private
	 * @type {number}
	 * @memberof Link
	 */
	@JsonProperty('user_id', Number)
	private readonly _user: number = 0;

	/**
	 * The internal ID of the tag associated with this link
	 *
	 * @readonly
	 * @private
	 * @type {number}
	 * @memberof Link
	 */
	@JsonProperty('tag_id', Number)
	private readonly _tag: number = 0;

	/**
	 * Gets the user associated with this link
	 *
	 * @returns {Promise<Tag>} A Promise wrapping the user this link is associated with
	 * @memberof Link
	 */
	public async user(): Promise<User> {
		return Fetch.fetchUserByID(this._user);
	}

	/**
	 * Gets the tag associated with this link
	 *
	 * @returns {Promise<Tag>} A Promise wrapping the tag this link is associated with
	 * @memberof Link
	 */
	public async tag(): Promise<Tag> {
		return Fetch.fetchTagByID(this._tag);
	}
}
