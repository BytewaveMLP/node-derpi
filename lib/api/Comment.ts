import { User } from './User';
import { Image } from './Image';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from '../util/DateConverter';
import { Fetch } from '..';

/**
 * Represents a single comment on an image
 *
 * @export
 * @class Comment
 */
@JsonObject('Comment')
export class Comment {
	/**
	 * The ID of the comment
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Comment
	 */
	@JsonProperty('id', Number)
	public readonly id: number = 0;

	/**
	 * The body of the comment
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Comment
	 */
	@JsonProperty('body', String)
	public readonly body: string = '';

	/**
	 * The date the comment was posted on
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Comment
	 */
	@JsonProperty('created_at', DateConverter)
	public readonly posted: Date = Consts.DEFAULT_DATE;

	/**
	 * The date the comment was last updated on
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Comment
	 */
	@JsonProperty('updated_at', DateConverter)
	public readonly updated: Date = Consts.DEFAULT_DATE;

	/**
	 * The date the comment was last edited on
	 *
	 * @type {Date}
	 * @memberof Comment
	 */
	@JsonProperty('edited_at', DateConverter)
	public readonly edited?: Date = undefined;

	/**
	 * Why the comment was edited
	 *
	 * @type {string}
	 * @memberof Comment
	 */
	@JsonProperty('edit_reason', String)
	public readonly editReason?: string = undefined;

	/**
	 * The name of the user who posted this comment
	 *
	 * Use this instead of (await author()).name to save an HTTP request and make the Derpi admins happy
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Comment
	 */
	@JsonProperty('author', String)
	public readonly authorName: string = '';

	/**
	 * The ID of the user who posted this comment
	 *
	 * @type {number}
	 * @memberof Comment
	 */
	@JsonProperty('user_id', Number)
	public readonly authorId?: number = undefined;

	/**
	 * A URI representing the user's avatar
	 * 
	 * May be a data URI or a link to an image
	 *
	 * @type {string}
	 * @memberof Comment
	 */
	@JsonProperty('avatar', String)
	public readonly authorAvatar: string = '';

	/**
	 * The internal ID of the image this comment was posted on
	 *
	 * @readonly
	 * @private
	 * @type {number}
	 * @memberof Comment
	 */
	@JsonProperty('image_id', Number)
	private readonly _image: number = 0;

	/**
	 * Gets the author of this comment
	 *
	 * @returns {Promise<User>} A Promise wrapping the user that posted this comment
	 * @memberof Comment
	 */
	public async author(): Promise<User | null> {
		if (!this.authorId) return null;
		return Fetch.fetchUserByID(this.authorId);
	}

	/**
	 * Gets the image this comment belongs to
	 *
	 * @returns {Promise<Image>} A Promise wrapping the image this comment was posted on
	 * @memberof Comment
	 */
	public async image(): Promise<Image> {
		return Fetch.fetchImage(this._image);
	}
}
