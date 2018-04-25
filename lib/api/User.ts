import { Link } from './Link';
import { Award } from './Award';
import { URLConverter } from '../util/URLConverter';
import { DateConverter } from '../util/DateConverter';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class User {
	/**
	 * The internal ID of the user
	 *
	 * @type {number}
	 * @memberof User
	 */
	@JsonProperty('id', Number)
	public id: number = 0;

	/**
	 * The display name of the user
	 *
	 * @type {string}
	 * @memberof User
	 */
	@JsonProperty('name', String)
	public name: string = '';

	/**
	 * The user's "slug" (for pretty URLs)
	 *
	 * @type {string}
	 * @memberof User
	 */
	@JsonProperty('slug', String)
	public slug: string = '';

	/**
	 * The role of the user
	 *
	 * @type {string}
	 * @memberof User
	 */
	@JsonProperty('role', String)
	public role: string = '';

	/**
	 * The description set on the user's profile
	 *
	 * @type {string}
	 * @memberof User
	 */
	@JsonProperty('description', String)
	public description: string = '';

	/**
	 * The number of comments posted by the user
	 *
	 * @type {number}
	 * @memberof User
	 */
	@JsonProperty('comment_count', Number)
	public comments: number = 0;

	/**
	 * The number of images uploaded by the user
	 *
	 * @type {number}
	 * @memberof User
	 */
	@JsonProperty('uploads_count', Number)
	public uploads: number = 0;

	/**
	 * The number of forum posts created by the user
	 *
	 * @type {number}
	 * @memberof User
	 */
	@JsonProperty('post_count', Number)
	public posts: number = 0;

	/**
	 * The number of forum threads created by the user
	 *
	 * @type {number}
	 * @memberof User
	 */
	@JsonProperty('topic_count', Number)
	public topics: number = 0;

	/**
	 * The artist links on the user's account
	 *
	 * @type {Link[]}
	 * @memberof User
	 */
	@JsonProperty('links', [Link])
	public links: Link[] = new Array<Link>();

	/**
	 * The awards the user has earned
	 *
	 * @type {Award[]}
	 * @memberof User
	 */
	@JsonProperty('awards', [Award])
	public awards: Award[] = new Array<Award>();

	/**
	 * The user's avatar
	 *
	 * @private
	 * @type {string}
	 * @memberof User
	 */
	@JsonProperty('avatar_url', URLConverter)
	public avatar: string = '';

	/**
	 * The date the user joined the site
	 *
	 * @type {Date}
	 * @memberof User
	 */
	@JsonProperty('created_at', DateConverter)
	public created: Date = Consts.DEFAULT_DATE;
}
