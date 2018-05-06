import { User } from '../api/User';
import { Tag } from '../api/Tag';
import { Image } from '../api/Image';
import * as URLs from '../util/URLs';
import * as Consts from '../util/Consts';

import * as request from 'request';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';
import { SearchResults } from '..';

export enum ResultSortFormat {
	CREATION_DATE = 'created_at',
	SCORE = 'score',
	WILSON_SCORE = 'wilson',
	RELEVANCE = 'relevance',
	WIDTH = 'width',
	HEIGHT = 'height',
	COMMENTS = 'comments',
	RANDOM = 'random'
}

export enum ResultSortOrder {
	ASCENDING = 'asc',
	DESCENDING = 'desc'
}

export interface SearchOptions {
	query?: string;
	sortFormat?: ResultSortFormat;
	sortOrder?: ResultSortOrder;
	page?: number;
}

export class Fetch {
	private static jsonConvert: JsonConvert = new JsonConvert();

	/**
	 * Sets up some basic settings for the Fetch instance
	 *
	 * YOU SHOULD NOT NEED TO CALL THIS YOURSELF. IT IS DONE AT MODULE INITIALIZATION TIME.
	 *
	 * @static
	 * @memberof Fetch
	 */
	public static setup() {
		this.jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
	}

	/**
	 * Fetches an image and its associated details
	 *
	 * @static
	 * @param {string} id The ID of the image to fetch
	 * @returns {Promise<Image>} A Promise wrapping the fetched image
	 * @memberof Fetch
	 */
	public static async fetchImage(id: string | number): Promise<Image> {
		const options: request.Options = {
			uri: URLs.IMAGE_URL.replace('{}', (id as string))
		};

		const json = await this.fetchJSON(Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, options));
		return this.jsonConvert.deserializeObject(json, Image);
	}

	/**
	 * Fetches a user and their associated details
	 *
	 * @static
	 * @param {string} identifier The username or ID of the user to fetch
	 * @returns {Promise<User>} A Promise wrapping the fetched user
	 * @memberof Fetch
	 */
	public static async fetchUser(identifier: string | number): Promise<User> {
		const options: request.Options = {
			uri: URLs.USER_URL.replace('{}', (identifier as string))
		};

		const json = await this.fetchJSON(Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, options));
		return this.jsonConvert.deserializeObject(json, User);
	}

	/**
	 * Fetches a tag and its associated details
	 *
	 * @static
	 * @param {string} identifier The name or ID of the tag to fetch
	 * @returns {Promise<Tag>} A Promise wrapping the fetched tag
	 * @memberof Fetch
	 */
	public static async fetchTag(identifier: string | number): Promise<Tag> {
		const options: request.UriOptions = {
			uri: URLs.TAG_URL.replace('{}', (identifier as string))
		};

		const json = await this.fetchJSON(Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, options));
		return this.jsonConvert.deserializeObject(json, Tag);
	}

	public static async search(searchOptions: SearchOptions): Promise<SearchResults> {
		let { query, sortFormat, sortOrder, page } = searchOptions;

		if (query === undefined) query = '*';
		if (sortFormat === undefined) sortFormat = ResultSortFormat.CREATION_DATE;
		if (sortOrder === undefined) sortOrder = ResultSortOrder.DESCENDING;
		if (page === undefined) page = 0;

		const options: request.Options = {
			uri: URLs.SEARCH_URL,
			qs: {
				q: query,
				sf: sortFormat,
				sd: sortOrder,
				page: page
			}
		};

		const json = await this.fetchJSON(Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, options));
		let searchResults = this.jsonConvert.deserializeObject(json, SearchResults);
		searchResults.nextPage = page + 1;
		searchResults.query = query;
		searchResults.sortFormat = sortFormat;
		searchResults.sortOrder = sortOrder;
		return searchResults;
	}

	/**
	 * Boilerplate to fetch JSON data from Derpibooru
	 *
	 * @static
	 * @private
	 * @param {request.UriOptions} options Options for the request
	 * @returns {Promise<any>} A Promise wrapping the returned data
	 * @memberof Fetch
	 */
	private static async fetchJSON(options: request.Options): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			const opts = Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, options);

			request.get(opts, (err: any, response: request.Response, body: any) => {
				if (err) {
					return reject(err);
				}

				const status = response.statusCode;
				if (status !== Consts.HTTP_200_OK && status !== Consts.HTTP_301_MOVED_PERMANENTLY) {
					return reject(new Error(`Received status code ${status}`));
				}

				return resolve(body);
			});
		});
	}
}
