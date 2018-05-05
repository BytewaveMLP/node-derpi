import { User } from './User';
import { Image } from './Image';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from '../util/DateConverter';
import { Fetch } from '..';

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
	public posted: Date = Consts.DEFAULT_DATE;

	@JsonProperty('author', String)
	private _author: string = '';

	@JsonProperty('image_id', Number)
	private _image: number = 0;

	/**
	 * Gets the author of this comment
	 *
	 * @returns {Promise<User>} A Promise wrapping the user that posted this comment
	 * @memberof Image
	 */
	public async author(): Promise<User> { // TODO: fetch
		// Part II of the Background Pony saga:
		// comments_home.json does NOT provide me with the user ID of the uploader, just the name
		// Is this a **user** with the name Background Pony #whatever, or is it a real anonymous user??
		// We're just going to assume the latter and hope nobody breaks anything.
		if (this._author.match(/Background Pony \#[0-9A-Z]+/)) {
			let user = new User();
			user.name = this._author;
			return user;
		}

		let user = await Fetch.fetchUser(this._author);

		return user;
	}

	/**
	 * Gets the image this comment belongs to
	 *
	 * @returns {Promise<Image>} A Promise wrapping the image this comment was posted on
	 * @memberof Image
	 */
	public async image(): Promise<Image> {
		return Fetch.fetchImage(this._image);
	}
}
