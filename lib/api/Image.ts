import { User } from './User';
import { Comment } from './Comment';
import { Tag } from './Tag';
import { ImageRepresentations } from './ImageRepresentations';
import * as Consts from '../util/Consts';
import { DateConverter } from '../util/DateConverter';

import { JsonObject, JsonProperty } from 'json2typescript';

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
