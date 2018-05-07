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
	 * @readonly
	 * @type {number}
	 * @memberof TagDetails
	 */
	@JsonProperty('id', Number)
	public readonly id: number = 0;

	/**
	 * The name of this tag
	 *
	 * @readonly
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('name', String)
	public readonly name: string = '';

	/**
	 * The sluggified name of this tag
	 *
	 * @readonly
	 * @see Helpers#sluggify
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('slug', String)
	public readonly slug: string = '';

	/**
	 * The description of this tag
	 *
	 * @readonly
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('description', String)
	public readonly description: string = '';

	/**
	 * The number of images on this tag
	 *
	 * @readonly
	 * @type {number}
	 * @memberof TagDetails
	 */
	@JsonProperty('images', Number)
	public readonly imageCount: number = 0;

	/**
	 * The namespace this tag is in (part before the colon)
	 *
	 * @readonly
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('namespace', String)
	public readonly namespace: string = '';

	/**
	 * The name of the tag in its namespace (part after the colon)
	 *
	 * @readonly
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('name_in_namespace', String)
	public readonly nameInNamespace: string = '';

	/**
	 * The category of tags this tag is in
	 *
	 * @readonly
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('category', String)
	public readonly category: string = '';

	/**
	 * The image used for spoilering images with this tag
	 *
	 * @readonly
	 * @type {string}
	 * @memberof TagDetails
	 */
	@JsonProperty('spoiler_image_uri', URLConverter)
	public readonly spoilerImage: string = '';

	/**
	 * The internal tag IDs for tags implied by this tag
	 *
	 * @readonly
	 * @private
	 * @type {number[]}
	 * @memberof TagDetails
	 */
	@JsonProperty('implied_tag_ids', [Number])
	private readonly _impliedTags: number[] = [];

	/**
	 * The internal tag ID for the tag this tag is aliased to, if any
	 *
	 * @readonly
	 * @private
	 * @type {number}
	 * @memberof TagDetails
	 */
	@JsonProperty('aliased_to_id', Number)
	private readonly _aliasedTo: number = -1;

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
