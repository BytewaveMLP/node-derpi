import { TagDetails } from './TagDetails';
import { Image } from './Image';
import { Fetch } from '../util/Fetch';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Tag {
	/**
	 * The details about this tag
	 *
	 * @type {TagDetails}
	 * @memberof Tag
	 */
	@JsonProperty('tag', TagDetails)
	public details: TagDetails = new TagDetails();

	/**
	 * The images on this page of results for this tag
	 *
	 * @type {Image[]}
	 * @memberof Tag
	 */
	@JsonProperty('images', [Image])
	public images: Image[] = [];

	/**
	 * The next page of results for this tag
	 *
	 * @type {number}
	 * @memberof Tag
	 */
	public nextPage: number = 0;

	/**
	 * Fetches the next page of images on this tag
	 *
	 * @returns {Promise<Tag>}
	 * @memberof Tag
	 */
	public async fetchNextPage(): Promise<Tag> {
		return Fetch.fetchTagByID(this.details.id, this.nextPage);
	}
}
