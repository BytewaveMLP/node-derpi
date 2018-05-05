import { User } from '../api/User';
import { Tag } from '../api/Tag';
import { Image } from '../api/Image';
import * as URLs from '../util/URLs';
import * as Consts from '../util/Consts';

import * as request from 'request';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';

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
		const options = Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, {
			uri: URLs.IMAGE_URL.replace('{}', (id as string))
		});

		const json = await this.fetchJSON(options);
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
		const options = Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, {
			uri: URLs.USER_URL.replace('{}', (identifier as string))
		});

		const json = await this.fetchJSON(options);
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
		const options = {
			uri: URLs.TAG_URL.replace('{}', (identifier as string))
		};

		const json = await this.fetchJSON(options);
		return this.jsonConvert.deserializeObject(json, Tag);
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
	private static async fetchJSON(options: request.UriOptions): Promise<any> {
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
