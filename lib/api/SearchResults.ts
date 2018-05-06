import { Image } from './Image';

import { JsonObject, JsonProperty } from 'json2typescript';
import { ResultSortFormat, ResultSortOrder, Fetch } from '../util/Fetch';

@JsonObject
export class SearchResults {
	@JsonProperty('search', [Image])
	public images: Image[] = new Array<Image>();

	@JsonProperty('total', Number)
	public total: number = 0;

	public query: string = '';

	public sortFormat: ResultSortFormat = ResultSortFormat.CREATION_DATE;

	public sortOrder: ResultSortOrder = ResultSortOrder.DESCENDING;

	public nextPage: number = 0;

	/**
	 * Fetches the next page of results
	 *
	 * @returns {SearchResults}
	 * @memberof SearchResults
	 */
	public async fetchNextPage(): Promise<SearchResults> {
		return Fetch.search({
			query: this.query,
			sortFormat: this.sortFormat,
			sortOrder: this.sortOrder,
			page: this.nextPage
		});
	}
}
