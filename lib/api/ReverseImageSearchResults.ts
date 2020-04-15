import { Image } from './Image';

import { JsonObject, JsonProperty } from 'json2typescript';

/**
 * Represents a page of search results
 *
 * @export
 * @class SearchResults
 */
@JsonObject('ReverseImageSearchResults')
export class ReverseImageSearchResults {
	/**
	 * The images on this page of results
	 *
	 * @readonly
	 * @type {Image[]}
	 * @memberof ReverseImageSearchResults
	 */
	@JsonProperty('images', [Image])
	public readonly images: Image[] = [];
}
