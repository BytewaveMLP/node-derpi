import { User } from './User';
import { Tag } from './Tag';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Link {
	/**
	 * The current state of the link
	 *
	 * @type {string}
	 * @memberof Link
	 */
	public state: string; // TODO: verified is known, what about other states?

	private _userId: number;

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

	private _tagId: number;

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
	private _created: string = '1970-01-01T00:00:00.000Z';

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
