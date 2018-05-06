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
	 * @type {Comment[]}
	 * @memberof ImageComments
	 */
	@JsonProperty('comments', [Comment])
	public comments: Comment[] = [];

	/**
	 * The total number of comments on the image
	 *
	 * @type {number}
	 * @memberof ImageComments
	 */
	@JsonProperty('total', Number)
	public total: number = 0;

	public nextPage: number = 0;

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
