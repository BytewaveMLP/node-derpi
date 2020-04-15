//import { Image } from './Image';
import { Fetch } from '../util/Fetch';
import { DefaultFilters } from '../util/DefaultFilters';

import { JsonObject, JsonProperty } from 'json2typescript';
import { URLConverter } from '../util/URLConverter';

/**
 * Represents a page of tag results, as well as a list of various details about a tag
 *
 * @export
 * @class Tag
 */
@JsonObject('Tag')
export class Tag {
	/**
	 * The ID of this tag
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Tag
	 */
	@JsonProperty('id', Number)
	public readonly id: number = 0;

	/**
	 * The category of tags this tag is in
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Tag
	 */
	@JsonProperty('category', String)
	public readonly category: string = '';

	/**
	 * The description of this tag
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Tag
	 */
	@JsonProperty('description', String)
	public readonly description: string = '';

	/**
	 * The number of images on this tag
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Tag
	 */
	@JsonProperty('images', Number)
	public readonly imageCount: number = 0;

	/**
	 * The name of this tag
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Tag
	 */
	@JsonProperty('name', String)
	public readonly name: string = '';

	/**
	 * The name of the tag in its namespace (part after the colon)
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Tag
	 */
	@JsonProperty('name_in_namespace', String)
	public readonly nameInNamespace: string = '';

	/**
	 * The namespace this tag is in (part before the colon)
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Tag
	 */
	@JsonProperty('namespace', String)
	public readonly namespace: string = '';

	/**
	 * The sluggified name of this tag
	 *
	 * @readonly
	 * @see Helpers#sluggify
	 * @type {string}
	 * @memberof Tag
	 */
	@JsonProperty('slug', String)
	public readonly slug: string = '';

	/**
	 * The image used for spoilering images with this tag
	 *
	 * @readonly
	 * @type {string}
	 * @memberof Tag
	 */
	@JsonProperty('spoiler_image_uri', URLConverter)
	public readonly spoilerImage: string = '';

	/**
	 * The images on this page of results for this tag
	 *
	 * @readonly
	 * @type {Image[]}
	 * @memberof Tag
	 */
	// @JsonProperty('images', [Image])
	// public readonly images: Image[] = [];

	/**
	 * The next page of results for this tag
	 *
	 * @type {number}
	 * @memberof Tag
	 */
	public nextPage: number = 0;

	/**
	 * The filter ID used for this search
	 *
	 * @readonly
	 * @type {number}
	 * @memberof Tag
	 */
	public filterID: DefaultFilters | number = DefaultFilters.DEFAULT;

	/**
	 * Fetches the next page of images on this tag
	 *
	 * @returns {Promise<Tag>}
	 * @memberof Tag
	 */
	public async fetchNextPage(): Promise<Tag> {
		return Fetch.fetchTagByID(this.id, this.nextPage, this.filterID);
	}
}
