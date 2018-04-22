import { User } from './User';
import { Tag } from './Tag';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from '../util/DateConverter';

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
	public created: Date = new Date(0);

	@JsonProperty('user_id', Number)
	private _user: number = 0;

	/**
	 * The user associated with this link
	 *
	 * @readonly
	 * @type {User}
	 * @memberof Link
	 */
	get user(): User { // TODO: fetch
		return new User();
	}

	// This technically shouldn't be used here and tag names would be preferred instead, however we aren't provided a tag name here.
	// @byte[] please fix the Derpi API
	@JsonProperty('tag_id', Number)
	private _tag: number = 0;

	/**
	 * The tag associated with this link
	 *
	 * @readonly
	 * @type {Tag}
	 * @memberof Link
	 */
	get tag(): Tag { // TODO: fetch
		return new Tag();
	}
}
