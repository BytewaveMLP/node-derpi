import { JsonObject, JsonProperty } from 'json2typescript';

import { User } from './User';
import { ImageRepresentations } from './ImageRepresentations';
import * as Consts from '../util/Consts';
import { DateConverter } from '../util/DateConverter';
import { Fetch } from '../util/Fetch';
import { TagCollection } from '../util/TagCollection';
import { ImageComments } from './ImageComments';
import { Tag } from './Tag';

/**
 * Represents a single image
 *
 * @export
 * @class Image
 */
@JsonObject
export class Image {
	/**
	 * The internal ID of the image
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('id', Number)
	public readonly id: number = 0;

	/**
	 * The total score on the image
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('score', Number)
	public readonly score: number = 0;

	/**
	 * The number of upvotes on the image
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('upvotes', Number)
	public readonly upvotes: number = 0;

	/**
	 * The number of downvotes on the image
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('downvotes', Number)
	public readonly downvotes: number = 0;

	/**
	 * The number of favorites on the image
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('faves', Number)
	public readonly favorites: number = 0;

	/**
	 * The tags on the image, represented as a comma-separated string for convenience
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('tags', String)
	public readonly tagString: string = '';

	/**
	 * Gets a list of tag names on the image; saves an HTTP request for each tag
	 *
	 * @readonly
	 * @type {string[]}
	 * @memberof Image
	 */
	get tagNames(): string[] {
		return this.tagString.split(', ');
	}

	/**
	 * Gets the name of the artist of the image
	 *
	 * Returns null if the image has no artist
	 *
	 * @readonly
	 * @type {(string | null)}
	 * @memberof Image
	 */
	get artistName(): string | null {
		let artist = this.tagNames.find(tag => tag.startsWith('artist:'));
		if (!artist) return null;

		return artist.substring('artist:'.length);
	}

	/**
	 * Gets the Tag object for the artist tag on the image
	 *
	 * Returns null if the image has no artist
	 *
	 * @returns {(Promise<Tag | null>)}
	 * @memberof Image
	 */
	public async artist(): Promise<Tag | null> {
		if (!this.artistName) return null;
		return Fetch.fetchTag(this.artistName);
	}

	/**
	 * The width of the image
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('width', Number)
	public readonly width: number = 0;

	/**
	 * The height of the image
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('height', Number)
	public readonly height: number = 0;

	/**
	 * The filename of the original uploaded image
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('file_name', String)
	public readonly fileName: string = '';

	/**
	 * The description of the image on Derpibooru, if any
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('description', String)
	public readonly description: string = '';

	/**
	 * The aspect ratio of the image
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('aspect_ratio', Number)
	public readonly aspectRatio: number = 0;

	/**
	 * The format the image was originally in before being uploaded to Deribooru
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('original_format', String)
	public readonly originalFormat: string = '';

	/**
	 * The MIME type of the image
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('mime_type', String)
	public readonly mimeType: string = '';

	/**
	 * The current SHA-512 hash of the image
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('sha512_hash', String)
	public readonly sha512: string = '';

	/**
	 * The SHA-512 hash of the original image without optimizations
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('orig_sha512_hash', String)
	public readonly sha512Original: string = '';

	/**
	 * The source of the image, if specified by the uploader
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('source_url', String)
	public readonly source: string = '';

	/**
	 * The different possible representations of the image
	 *
	 * @readonly
	 * @type {ImageRepresentations}
	 * @memberof Image
	 */
	@JsonProperty('representations', ImageRepresentations)
	public readonly representations: ImageRepresentations = new ImageRepresentations();

	/**
	 * Whether the image has been rendered by Derpibooru
	 *
	 * @readonly
	 * @type {boolean}
	 * @memberof Image
	 */
	@JsonProperty('is_rendered', Boolean)
	public readonly isRendered: boolean = false;

	/**
	 * Whether the image has finished being optimized by Derpibooru
	 *
	 * @readonly
	 * @type {boolean}
	 * @memberof Image
	 */
	@JsonProperty('is_optimized', Boolean)
	public readonly isOptimized: boolean = false;

	/**
	 * When the image was uploaded to the site
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Image
	 */
	@JsonProperty('created_at', DateConverter)
	public readonly created: Date = Consts.DEFAULT_DATE;

	/**
	 * When the image details were last edited
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Image
	 */
	@JsonProperty('updated_at', DateConverter)
	public readonly updated: Date = Consts.DEFAULT_DATE;

	/**
	 * When the image was first seen
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof Image
	 */
	@JsonProperty('first_seen_at', DateConverter)
	public readonly firstSeen: Date = Consts.DEFAULT_DATE;

	/**
	 * The name of the user that uploaded the image
	 *
	 * Use this instead of (await uploader()).name to save an HTTP request and make the Derpi admins happy
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Image
	 */
	@JsonProperty('uploader', String)
	public readonly uploaderName: string = '';

	/**
	 * The ID of the user that uploaded the image
	 *
	 * Use this instead of (await uploader()).id to save an HTTP request and make the Derpi admins happy
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Image
	 */
	@JsonProperty('uploader_id', Number)
	public readonly uploaderID: number = 0;

	/**
	 * The tag IDs on the image as returned from the API
	 *
	 * @private
	 * @readonly
	 * @type {number[]}
	 * @memberof Image
	 */
	@JsonProperty('tag_ids', [Number])
	private readonly _tags: number[] = [];

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

		// tslint:disable-next-line: strict-type-predicates
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
