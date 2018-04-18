import { Link } from './Link';
import { Award } from './Award';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class User {
	@JsonProperty('id', Number)
	public id: number = 0;

	@JsonProperty('name', String)
	public name: string = '';

	@JsonProperty('slug', String)
	public slug: string = '';

	@JsonProperty('role', String)
	public role: string = '';

	@JsonProperty('description', String)
	public description: string = '';

	@JsonProperty('comment_count', Number)
	public comments: number = 0;

	@JsonProperty('uploads_count', Number)
	public uploads: number = 0;

	@JsonProperty('post_count', Number)
	public posts: number = 0;

	@JsonProperty('topic_count', Number)
	public topics: number = 0;

	@JsonProperty('links', [Link])
	public links: Link[] = new Array<Link>();

	@JsonProperty('awards', [Award])
	public awards: Award[] = new Array<Award>();

	@JsonProperty('avatar', String)
	private _avatar: string;

	get avatar(): string {
		return 'https:' + this._avatar;
	}

	@JsonProperty('created_at', String)
	private _created: string = '';

	get created(): Date {
		return new Date(this._created);
	}
}
