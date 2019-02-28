import { TagDetails } from './TagDetails';
import { Image } from './Image';
import { Fetch } from '../util/Fetch';
import { DefaultFilters } from '../util/DefaultFilters';

import { JsonObject, JsonProperty } from 'json2typescript';

/**
 * Represents a page of tag results, as well as a list of various details about a tag
 *
 * @export
 * @class Tag
 */
@JsonObject
export class Tag {
	/**
	 * The details about this tag
	 *
	 * @readonly
	 * @type {TagDetails}
	 * @memberof Tag
	 */
	@JsonProperty('tag', TagDetails)
	public readonly details: TagDetails = new TagDetails();

	/**
	 * The images on this page of results for this tag
	 *
	 * @readonly
	 * @type {Image[]}
	 * @memberof Tag
	 */
	@JsonProperty('images', [Image])
	public readonly images: Image[] = [];

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
		return Fetch.fetchTagByID(this.details.id, this.nextPage, this.filterID);
	}
}
