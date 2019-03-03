import { Image } from './Image';

import { JsonObject, JsonProperty } from 'json2typescript';

/**
 * Represents a page of search results
 *
 * @export
 * @class SearchResults
 */
@JsonObject
export class ReverseImageSearchResults {
	/**
	 * The images on this page of results
	 *
	 * @readonly
	 * @type {Image[]}
	 * @memberof ReverseImageSearchResults
	 */
	@JsonProperty('search', [Image])
	public readonly images: Image[] = [];

	/**
	 * The total number of images returned by this search
	 *
	 * @readonly
	 * @type {number}
	 * @memberof ReverseImageSearchResults
	 */
	@JsonProperty('total', Number)
	public readonly total: number = 0;
}
