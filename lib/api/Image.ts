import { User } from './User';
import { Comment } from './Comment';
import { Tag } from './Tag';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';

export class Image {
	/**
	 *
	 *
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('id', Number)
	public id: number = 0;

	/**
	 * The total score on the image
	 *
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('score', Number)
	public score: number = 0;

	/**
	 * The number of upvotes on the image
	 *
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('upvotes', Number)
	public upvotes: number = 0;

	/**
	 * The number of downvotes on the image
	 *
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('downvotes', Number)
	public downvotes: number = 0;

	/**
	 * The number of favorites on the image
	 *
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('favorites', Number)
	public favorites: number = 0;

	/**
	 * The comments posted on the image
	 *
	 * @readonly
	 * @type {Comment[]}
	 * @memberof Image
	 */
	get comments(): Comment[] { // TODO: fetch
		// This should be fetched at:
		// https://derpibooru.org/images/IMAGE_ID/comments_home.json
		return new Array<Comment>();
	}

	/**
	 * The width of the image
	 *
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('width', Number)
	public width: number = 0;

	/**
	 * The height of the image
	 *
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('height', Number)
	public height: number = 0;

	/**
	 * The filename of the original uploaded image
	 *
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('file_name', String)
	public fileName: string = '';

	/**
	 * The description of the image on Derpibooru, if any
	 *
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('description', String)
	public description: string = '';

	@JsonProperty('uploader_id', Number)
	private _uploader: number = 0;

	/**
	 * The user that uploaded this image
	 *
	 * @readonly
	 * @type {User}
	 * @memberof Image
	 */
	get uploader(): User { // TODO: fetch
		return new User();
	}

	@JsonProperty('created_at')
	private _created: string = Consts.DEFAULT_DATE;

	/**
	 * The date this image was uploaded to Derpibooru
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Image
	 */
	get created(): Date {
		return new Date(this._created);
	}

	private _updated: string;

	/**
	 * The date this image was last edited
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Image
	 */
	get updated(): Date {
		return new Date(this._updated);
	}

	private _firstSeen: string;

	/**
	 * The date this image was first seen
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Image
	 */
	get firstSeen(): Date {
		return new Date(this._firstSeen);
	}

	@JsonProperty('tag_ids', [Number])
	private _tags: number[] = new Array<number>();

	/**
	 * The tags on the image
	 *
	 * @readonly
	 * @type {Tag[]}
	 * @memberof Image
	 */
	get tags(): Tag[] { // TODO: fetch
		return new Array<Tag>();
	}
}
