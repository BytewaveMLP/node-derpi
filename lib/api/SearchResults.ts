import { Image } from './Image';

import { JsonObject, JsonProperty } from 'json2typescript';
import { ResultSortFormat, ResultSortOrder, Fetch } from '../util/Fetch';
import { DefaultFilters } from '../util/DefaultFilters';

/**
 * Represents a page of search results
 *
 * @export
 * @class SearchResults
 */
@JsonObject('SearchResults')
export class SearchResults {
	/**
	 * The images on this page of results
	 *
	 * @readonly
	 * @type {Image[]}
	 * @memberof SearchResults
	 */
	@JsonProperty('images', [Image])
	public readonly images: Image[] = [];

	/**
	 * The total number of images returned by this search
	 *
	 * @readonly
	 * @type {number}
	 * @memberof SearchResults
	 */
	@JsonProperty('total', Number)
	public readonly total: number = 0;

	/**
	 * The query used to perform this search
	 *
	 * @type {string}
	 * @memberof SearchResults
	 */
	public query: string = '';

	/**
	 * The sort format used on this search
	 *
	 * @type {ResultSortFormat}
	 * @memberof SearchResults
	 */
	public sortFormat: ResultSortFormat = ResultSortFormat.CREATION_DATE;

	/**
	 * The sort order used on this search
	 *
	 * @type {ResultSortOrder}
	 * @memberof SearchResults
	 */
	public sortOrder: ResultSortOrder = ResultSortOrder.DESCENDING;

	/**
	 * The next page of results
	 *
	 * @readonly
	 * @see fetchNextPage
	 * @type {number}
	 * @memberof SearchResults
	 */
	public nextPage: number = 0;

	/**
	 * The filter ID used for this search
	 *
	 * @readonly
	 * @type {number}
	 * @memberof SearchResults
	 */
	public filterID: DefaultFilters | number = DefaultFilters.DEFAULT;

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
			page: this.nextPage,
			filterID: this.filterID
		});
	}
}
