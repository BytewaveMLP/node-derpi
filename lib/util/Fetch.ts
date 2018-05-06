import { User } from '../api/User';
import { Tag } from '../api/Tag';
import { Image } from '../api/Image';
import * as URLs from '../util/URLs';
import * as Consts from '../util/Consts';
import * as Helpers from '../util/Helpers';

import * as request from 'request';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';
import { SearchResults } from '../api/SearchResults';
import { ImageComments } from '../api/ImageComments';

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

const MAXIUMUM_ID_FETCH_RETRIES = 10;

export class Fetch {
	private static jsonConvert: JsonConvert = new JsonConvert();
	private static tagIDToURLMap: Map<number, string> = new Map<number, string>();
	private static userIDToURLMap: Map<number, string> = new Map<number, string>();

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
	 * Fetches a user and their associated details by name
	 *
	 * @static
	 * @param {string} identifier The username of the user to fetch
	 * @returns {Promise<User>} A Promise wrapping the fetched user
	 * @memberof Fetch
	 */
	public static async fetchUser(username: string): Promise<User> {
		const options: request.Options = {
			uri: URLs.USER_URL.replace('{}', Helpers.slugify(username))
		};

		const json = await this.fetchJSON(Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, options));
		return this.jsonConvert.deserializeObject(json, User);
	}

	/**
	 * Fetches a user and its associated details by ID
	 *
	 * THIS IS A VERY VERY VERY DIRTY HACK, BUT DERPIBOORU'S API DESIGN REQUIRES ITS EXISTENCE!
	 * I'M SORRY!
	 *
	 * @static
	 * @param {number} id The ID of the user to fetch
	 * @returns {Promise<Tag>} A Promise wrapping the fetched user
	 * @memberof Fetch
	 */
	public static async fetchUserByID(id: number): Promise<User> {
		let curId = '0' + id;

		if (this.userIDToURLMap.has(id)) {
			curId = (this.userIDToURLMap.get(id) as string);
		}

		const options: request.Options = {
			uri: URLs.USER_URL.replace('{}', curId)
		};
		let requestOptions = Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, options);
		let json = await this.fetchJSON(requestOptions);

		let loopCount = 0;

		while (json.id !== id) {
			curId = '0' + curId;
			requestOptions.uri = URLs.USER_URL.replace('{}', curId);
			json = await this.fetchJSON(requestOptions);

			loopCount++;

			if (loopCount >= MAXIUMUM_ID_FETCH_RETRIES) {
				throw new Error('Maximum number of fetch attempts exceeded - blame Derpibooru for allowing name -> ID collisions.');
			}
		}

		if (!this.userIDToURLMap.has(id)) {
			this.userIDToURLMap.set(id, curId);
		}

		return this.jsonConvert.deserializeObject(json, User);
	}

	/**
	 * Fetches a tag and its associated details by name
	 *
	 * @static
	 * @param {string} identifier The name of the tag to fetch
	 * @param {number} [page] The page of images to fetch
	 * @returns {Promise<Tag>} A Promise wrapping the fetched tag
	 * @memberof Fetch
	 */
	public static async fetchTag(name: string, page?: number): Promise<Tag> {
		if (page === undefined) page = 1;

		const options: request.Options = {
			uri: URLs.TAG_URL.replace('{}', Helpers.slugify(name)),
			qs: {
				page: page
			}
		};

		const json = await this.fetchJSON(Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, options));
		return this.jsonConvert.deserializeObject(json, Tag);
	}

	/**
	 * Fetches a tag and its associated details by ID
	 *
	 * THIS IS A VERY VERY VERY DIRTY HACK, BUT DERPIBOORU'S API DESIGN REQUIRES ITS EXISTENCE!
	 * I'M SORRY!
	 *
	 * @static
	 * @param {number} id The ID of the tag to fetch
	 * @param {number} [page] The page of images to fetch
	 * @returns {Promise<Tag>} A Promise wrapping the fetched tag
	 * @memberof Fetch
	 */
	public static async fetchTagByID(id: number, page?: number): Promise<Tag> {
		if (page === undefined) page = 1;

		let curId = '0' + id;

		if (this.tagIDToURLMap.has(id)) {
			curId = (this.tagIDToURLMap.get(id) as string);
		}

		const options: request.Options = {
			uri: URLs.TAG_URL.replace('{}', curId),
			qs: {
				page: page
			}
		};
		let requestOptions = Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, options);
		let json = await this.fetchJSON(requestOptions);

		let loopCount = 0;

		while (json.tag.id !== id) {
			curId = '0' + curId;
			requestOptions.uri = URLs.TAG_URL.replace('{}', curId);
			json = await this.fetchJSON(requestOptions);

			loopCount++;

			if (loopCount >= MAXIUMUM_ID_FETCH_RETRIES) {
				throw new Error('Maximum number of fetch attempts exceeded - blame Derpibooru for allowing name -> ID collisions.');
			}
		}

		if (!this.tagIDToURLMap.has(id)) {
			this.tagIDToURLMap.set(id, curId);
		}

		return this.jsonConvert.deserializeObject(json, Tag);
	}

	/**
	 * Searches for a set of images matching the given query
	 *
	 * @static
	 * @see SearchOptions
	 * @param {SearchOptions} searchOptions The options to search with
	 * @returns {Promise<SearchResults>} A Promise wrapping the search results
	 * @memberof Fetch
	 */
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
	 * Fetches the comments on an image
	 *
	 * @static
	 * @param {number} imageID The ID of the image to fetch comments from
	 * @param {(number)} [page] The page of comments to fetch
	 * @returns {Promise<ImageComments>}
	 * @memberof Fetch
	 */
	public static async fetchComments(imageID: number, page?: number): Promise<ImageComments> {
		if (page === undefined) page = 1;

		const options: request.Options = {
			uri: URLs.COMMENTS_URL.replace('{}', '' + imageID)
		};

		const json = await this.fetchJSON(Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, options));
		let comments = this.jsonConvert.deserializeObject(json, ImageComments);
		comments.nextPage = page + 1;
		comments.imageID = imageID;
		return comments;
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
