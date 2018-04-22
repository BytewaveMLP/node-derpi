import { User } from './User';
import { Image } from './Image';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from '../util/DateConverter';

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

	/**
	 * The date the comment was posted on
	 *
	 * @type {Date}
	 * @memberof Comment
	 */
	@JsonProperty('posted_at', DateConverter)
	public posted: Date = new Date(0);

	@JsonProperty('author', String)
	private _author: string = '';

	/**
	 * The author of this comment
	 *
	 * @readonly
	 * @type {User}
	 * @memberof Comment
	 */
	get author(): User { // TODO: fetch
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
	get image(): Image { // TODO: fetch
		return new Image();
	}
}
