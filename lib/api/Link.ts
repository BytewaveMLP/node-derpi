import { User } from './User';
import { Tag } from './Tag';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from '../util/DateConverter';
import { Fetch } from '..';

@JsonObject
export class Link {
	/**
	 * The current state of the link
	 *
	 * @type {string}
	 * @memberof Link
	 */
	@JsonProperty('state', String)
	public state: string = ''; // TODO: verified is known, what about other states?

	/**
	 * When the link was first established
	 *
	 * @type {Date}
	 * @memberof Link
	 */
	@JsonProperty('created_at', DateConverter)
	public created: Date = Consts.DEFAULT_DATE;

	@JsonProperty('user_id', Number)
	private _user: number = 0;

	// This technically shouldn't be used here and tag names would be preferred instead, however we aren't provided a tag name here.
	// @byte[] please fix the Derpi API
	@JsonProperty('tag_id', Number)
	private _tag: number = 0;

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
