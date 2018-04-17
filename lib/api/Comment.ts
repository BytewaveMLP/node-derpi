import { User } from './User';
import { Image } from './Image';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';

export class Comment {
	/**
	 * The ID of the comment
	 *
	 * @type {number}
	 * @memberof Comment
	 */
	@JsonProperty('id', Number)
	public id: number = 0;

	/**
	 * The body of the comment
	 *
	 * @type {string}
	 * @memberof Comment
	 */
	@JsonProperty('body', String)
	public body: string = '';

	/**
	 * Has the comment been deleted?
	 *
	 * @type {boolean}
	 * @memberof Comment
	 */
	@JsonProperty('deleted', Boolean)
	public deleted: boolean = false;

	@JsonProperty('posted_at', String)
	private _posted: string = Consts.DEFAULT_DATE;

	/**
	 * The date this comment was posted
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Comment
	 */
	get posted(): Date {
		return new Date(this._posted);
	}

	@JsonProperty('author', String)
	private _author: string = '';

	/**
	 * The author of this comment
	 *
	 * @readonly
	 * @type {User}
	 * @memberof Comment
	 */
	get author(): User {
		return new User();
	}

	@JsonProperty('image_id', Number)
	private _image: number = 0;

	/**
	 * The image this comment belongs to
	 *
	 * @readonly
	 * @type {Image}
	 * @memberof Comment
	 */
	get image(): Image {
		return new Image();
	}
}
