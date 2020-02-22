import { Tag } from './Tag';

import { JsonObject, JsonProperty } from 'json2typescript';
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
