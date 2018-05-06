import { Tag } from './Tag';

import { JsonObject, JsonProperty } from 'json2typescript';
import { URLConverter } from '../util/URLConverter';
import { Fetch } from '..';
import { TagCollection } from '../util/TagCollection';

/**
 * Represents some basic details about a given tag
 *
 * @export
 * @class TagDetails
 */
@JsonObject
export class TagDetails {
	/**
	 * The ID of this tag
	 *
	 * @type {number}
	 * @memberof TagDetails
	 */
	@JsonProperty('id', Number)
	public id: number = 0;

	/**
	 * The name of this tag
	 *
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('name', String)
	public name: string = '';

	/**
	 * The sluggified name of this tag
	 *
	 * @see Helpers#sluggify
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('slug', String)
	public slug: string = '';

	/**
	 * The description of this tag
	 *
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('description', String)
	public description: string = '';

	/**
	 * The number of images on this tag
	 *
	 * @type {number}
	 * @memberof TagDetails
	 */
	@JsonProperty('images', Number)
	public imageCount: number = 0;

	/**
	 * The namespace this tag is in (part before the colon)
	 *
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('namespace', String)
	public namespace: string = '';

	/**
	 * The name of the tag in its namespace (part after the colon)
	 *
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('name_in_namespace', String)
	public nameInNamespace: string = '';

	/**
	 * The category of tags this tag is in
	 *
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('category', String)
	public category: string = '';

	/**
	 * The image used for spoilering images with this tag
	 *
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('spoiler_image_uri', URLConverter)
	public spoilerImage: string = '';

	@JsonProperty('implied_tag_ids', [Number])
	private _impliedTags: number[] = [];

	@JsonProperty('aliased_to_id', Number)
	private _aliasedTo: number = -1;

	/**
	 * Gets a list of tags implied by this tag
	 *
	 * @returns {Promise<TagCollection>} A Promise wrapping a TagCollection of implied tags
	 * @memberof TagDetails
	 */
	public async impliedTags(): Promise<TagCollection> {
		return new TagCollection(this._impliedTags);
	}

	/**
	 * Gets the tag this tag is an alias of, if it exists
	 *
	 * @returns {(Promise<Tag | null>)} The aliased tag, or null if none exists
	 * @memberof TagDetails
	 */
	public async aliasedTo(): Promise<Tag | null> {
		if (this._aliasedTo === -1) return null;
		return Fetch.fetchTagByID(this._aliasedTo);
	}
}
