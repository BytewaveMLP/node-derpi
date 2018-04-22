import { Image } from './Image';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class SearchResults {
	@JsonProperty('search', [Image])
	public images: Image[] = new Array<Image>();

	@JsonProperty('total', Number)
	public total: number = 0;

	public query: string = '';

	public nextPage: number = 0;

	/**
	 * Fetches the next page of results
	 *
	 * @returns {SearchResults}
	 * @memberof SearchResults
	 */
	public fetchNextPage(): SearchResults { // TODO: fetch
		return new SearchResults();
	}
}
