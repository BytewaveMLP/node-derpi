import { User } from './User';
import { Tag } from './Tag';

export interface ILinkSerialized {
	user_id: number;
	created_at: string;
	state: string;
	tag_id: number;
}

export class Link {
	/**
	 * The date this link was created
	 *
	 * @type {Date}
	 * @memberof Link
	 */
	public created: Date;

	/**
	 * The current state of the link
	 *
	 * @type {string}
	 * @memberof Link
	 */
	public state: string; // TODO: verified is known, what about other states?

	private _userId: number;
	private _tagId: number;

	/**
	 * The tag associated with this link
	 *
	 * @readonly
	 * @type {Tag}
	 * @memberof Link
	 */
	get tag(): Tag {
		return new Tag();
	}

	/**
	 * The user associated with this link
	 *
	 * @readonly
	 * @type {User}
	 * @memberof Link
	 */
	get user(): User {
		return new User();
	}

	public fromJSON(obj: ILinkSerialized) {
		this._userId = obj.user_id;
		this.created = new Date(obj.created_at);
		this.state = obj.state;
		this._tagId = obj.tag_id;
	}
}
