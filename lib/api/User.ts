import { Link } from './Link';
import { Award } from './Award';
import { URLConverter } from '../util/URLConverter';
import { DateConverter } from '../util/DateConverter';
import * as Consts from '../util/Consts';

import { JsonObject, JsonProperty } from 'json2typescript';

/**
 * Represents a user on Derpibooru, registered or unregistered
 *
 * @export
 * @class User
 */
@JsonObject
export class User {
	/**
	 * The internal ID of the user
	 *
	 * @readonly
	 * @type {number}
	 * @memberof User
	 */
	@JsonProperty('id', Number)
	public readonly id: number = -1;

	/**
	 * The display name of the user
	 *
	 * @type {string}
	 * @memberof User
	 */
	@JsonProperty('name', String)
	public name: string = 'Background Pony';

	/**
	 * The user's "slug" (for pretty URLs)
	 *
	 * @readonly
	 * @type {string}
	 * @memberof User
	 */
	@JsonProperty('slug', String)
	public readonly slug: string = 'Background-Pony';

	/**
	 * The role of the user
	 *
	 * @readonly
	 * @type {string}
	 * @memberof User
	 */
	@JsonProperty('role', String)
	public readonly role: string = '';

	/**
	 * The description set on the user's profile
	 *
	 * @readonly
	 * @type {string}
	 * @memberof User
	 */
	@JsonProperty('description', String)
	public readonly description: string = '';

	/**
	 * The number of comments posted by the user
	 *
	 * @readonly
	 * @type {number}
	 * @memberof User
	 */
	@JsonProperty('comment_count', Number)
	public readonly comments: number = 0;

	/**
	 * The number of images uploaded by the user
	 *
	 * @readonly
	 * @type {number}
	 * @memberof User
	 */
	@JsonProperty('uploads_count', Number)
	public readonly uploads: number = 0;

	/**
	 * The number of forum posts created by the user
	 *
	 * @readonly
	 * @type {number}
	 * @memberof User
	 */
	@JsonProperty('post_count', Number)
	public readonly posts: number = 0;

	/**
	 * The number of forum threads created by the user
	 *
	 * @readonly
	 * @type {number}
	 * @memberof User
	 */
	@JsonProperty('topic_count', Number)
	public readonly topics: number = 0;

	/**
	 * The artist links on the user's account
	 *
	 * @readonly
	 * @type {Link[]}
	 * @memberof User
	 */
	@JsonProperty('links', [Link])
	public readonly links: Link[] = [];

	/**
	 * The awards the user has earned
	 *
	 * @readonly
	 * @type {Award[]}
	 * @memberof User
	 */
	@JsonProperty('awards', [Award])
	public readonly awards: Award[] = [];

	/**
	 * The user's avatar
	 *
	 * @readonly
	 * @private
	 * @type {string}
	 * @memberof User
	 */
	@JsonProperty('avatar_url', URLConverter)
	public readonly avatar: string = 'https://derpicdn.net/avatars/2016/02/28/03_09_08_673_Bildschirmfoto_2016_02_28_um_03.07.54.png';

	/**
	 * The date the user joined the site
	 *
	 * @readonly
	 * @type {Date}
	 * @memberof User
	 */
	@JsonProperty('created_at', DateConverter)
	public readonly created: Date = Consts.DEFAULT_DATE;
}
