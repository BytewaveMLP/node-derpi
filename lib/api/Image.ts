import { User } from './User';
import { Comment } from './Comment';
import { Tag } from './Tag';
import { ImageRepresentations } from './ImageRepresentations';
import * as Consts from '../util/Consts';
import { DateConverter } from '../util/DateConverter';

import { JsonObject, JsonProperty } from 'json2typescript';
import { Fetch } from '../util/Fetch';
import { TagCollection } from '../util/TagCollection';
import { ImageComments } from './ImageComments';

@JsonObject
export class Image {
	/**
	 * The internal ID of the image
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
	@JsonProperty('faves', Number)
	public favorites: number = 0;

	/**
	 * The tags on the image, represented as a comma-separated string for convenience
	 *
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('tags', String)
	public tagString: string = '';

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

	/**
	 * The aspect ratio of the image
	 *
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('aspect_ratio', Number)
	public aspectRatio: number = 0;

	/**
	 * The format the image was originally in before being uploaded to Deribooru
	 *
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('original_format', String)
	public originalFormat: string = '';

	/**
	 * The MIME type of the image
	 *
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('mime_type', String)
	public mimeType: string = '';

	/**
	 * The current SHA-512 hash of the image
	 *
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('sha512_hash', String)
	public sha512: string = '';

	/**
	 * The SHA-512 hash of the original image without optimizations
	 *
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('orig_sha512_hash', String)
	public sha512Original: string = '';

	/**
	 * The source of the image, if specified by the uploader
	 *
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('source_url', String)
	public source: string = '';

	/**
	 * The different possible representations of the image
	 *
	 * @type {ImageRepresentations}
	 * @memberof Image
	 */
	@JsonProperty('representations', ImageRepresentations)
	public representations: ImageRepresentations = new ImageRepresentations();

	/**
	 * Whether the image has been rendered by Derpibooru
	 *
	 * @type {boolean}
	 * @memberof Image
	 */
	@JsonProperty('is_rendered', Boolean)
	public isRendered: boolean = false;

	/**
	 * Whether the image has finished being optimized by Derpibooru
	 *
	 * @type {boolean}
	 * @memberof Image
	 */
	@JsonProperty('is_optimized', Boolean)
	public isOptimized: boolean = false;

	/**
	 * When the image was uploaded to the site
	 *
	 * @type {Date}
	 * @memberof Image
	 */
	@JsonProperty('created_at', DateConverter)
	public created: Date = Consts.DEFAULT_DATE;

	/**
	 * When the image details were last edited
	 *
	 * @type {Date}
	 * @memberof Image
	 */
	@JsonProperty('updated_at', DateConverter)
	public updated: Date = Consts.DEFAULT_DATE;

	/**
	 * When the image was first seen
	 *
	 * @type {Date}
	 * @memberof Image
	 */
	@JsonProperty('first_seen_at', DateConverter)
	public firstSeen: Date = Consts.DEFAULT_DATE;

	/**
	 * The name of the user that uploaded the image
	 *
	 * Use this instead of (await uploader()).name to save an HTTP request and make the Derpi admins happy
	 *
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('uploader', String)
	public uploaderName: string = '';

	/**
	 * The ID of the user that uploaded the image
	 *
	 * Use this instead of (await uploader()).id to save an HTTP request and make the Derpi admins happy
	 *
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('uploader_id', Number)
	public uploaderID: number = 0;

	@JsonProperty('tag_ids', [Number])
	private _tags: number[] = [];

	/**
	 * Gets the user that uploaded the image
	 *
	 * @returns {Promise<User>} A Promise wrapping the uploader's details
	 * @memberof Image
	 */
	public async uploader(): Promise<User> {
		// Today I learned: Background Pony is a valid uploader for uploads originating from guest accounts, **HOWEVER**
		// it is ALSO a valid login name (see: https://derpibooru.org/profiles/Background%20Pony).
		// So, I have to store both the uploader **and** uploader ID here to make sure both are set to values indicating a guest.
		// This API is going to drive me insane.
		if (this.uploaderName === 'Background Pony' && this.uploaderID === null) {
			return new User();
		}

		return Fetch.fetchUserByID(this.uploaderID);
	}

	/**
	 * Gets the tags on the image
	 *
	 * @returns {Promise<TagCollection>} A Promise wrapping the tags on the image
	 * @memberof Image
	 */
	public async tags(): Promise<TagCollection> {
		return new TagCollection(this._tags);
	}

	/**
	 * Gets the comments on the image
	 *
	 * @param {(number | undefined)} page The page number of comments to fetch (max appears to be total / 20 for non-logged-in users)
	 * @returns {Promise<ImageComments>}
	 * @memberof Image
	 */
	public async comments(page: number | undefined): Promise<ImageComments> {
		return Fetch.fetchComments(this.id, page);
	}
}
