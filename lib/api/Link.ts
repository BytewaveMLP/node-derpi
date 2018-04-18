import { User } from './User';
import { Tag } from './Tag';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';

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

	@JsonProperty('user_id', Number)
	private _user: number = 0;

	/**
	 * The user associated with this link
	 *
	 * @readonly
	 * @type {User}
	 * @memberof Link
	 */
	get user(): User {
		return new User();
	}

	@JsonProperty('tag_id', Number)
	private _tag: number = 0;

	/**
	 * The tag associated with this link
	 *
	 * @readonly
	 * @type {Tag}
	 * @memberof Link
	 */
	get tag(): Tag {
		return new Tag();
	}

	@JsonProperty('created_at', String)
	private _created: string = Consts.DEFAULT_DATE;

	/**
	 * The date this link was created
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Link
	 */
	get created(): Date {
		return new Date(this._created);
	}
}
