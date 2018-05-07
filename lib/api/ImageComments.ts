import { Comment } from './Comment';

import { JsonObject, JsonProperty } from 'json2typescript';
import { Fetch } from '..';

/**
 * Represents a page of comments on an image
 *
 * @export
 * @class ImageComments
 */
@JsonObject
export class ImageComments {
	/**
	 * The comments on this page
	 *
	 * @readonly
	 * @type {Comment[]}
	 * @memberof ImageComments
	 */
	@JsonProperty('comments', [Comment])
	public readonly comments: Comment[] = [];

	/**
	 * The total number of comments on the image
	 *
	 * @readonly
	 * @type {number}
	 * @memberof ImageComments
	 */
	@JsonProperty('total', Number)
	public readonly total: number = 0;

	/**
	 * The index of the next page of comments
	 *
	 * @type {number}
	 * @memberof ImageComments
	 */
	public nextPage: number = 0;

	/**
	 * The internal ID of the image these comments were posted on
	 *
	 * @type {number}
	 * @memberof ImageComments
	 */
	public imageID: number = 0;

	/**
	 * Retrieves the next page of comments
	 *
	 * @returns {Promise<ImageComments>} The next page of comments (note that comments might be empty if you go over too many pages)
	 * @memberof ImageComments
	 */
	public async fetchNextPage(): Promise<ImageComments> {
		return Fetch.fetchComments(this.imageID, this.nextPage);
	}
}
