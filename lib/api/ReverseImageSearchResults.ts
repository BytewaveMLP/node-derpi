import { Image } from './Image';

import { JsonObject, JsonProperty } from 'json2typescript';
import { Fetch } from '../util/Fetch';

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

	/**
	 * The next page of results
	 *
	 * @readonly
	 * @see fetchNextPage
	 * @type {number}
	 * @memberof ReverseImageSearchResults
	 */
	// public nextPage: number = 0;

	/**
	 * Fetches the next page of results
	 *
	 * @returns {ReverseImageSearchResults}
	 * @memberof ReverseImageSearchResults
	 */
	// public async fetchNextPage(): Promise<ReverseImageSearchResults> {
	// 	return Fetch.reverseImageSearch({
	// 		page: this.nextPage
	// 	});
	// }
}
