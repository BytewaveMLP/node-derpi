import { Tag } from './Tag';

import { JsonObject, JsonProperty } from 'json2typescript';
import { URLConverter } from '../util/URLConverter';
import { Fetch } from '..';
import { TagCollection } from '../util/TagCollection';

@JsonObject
export class TagDetails {
	@JsonProperty('id', Number)
	public id: number = 0;

	@JsonProperty('name', String)
	public name: string = '';

	@JsonProperty('slug', String)
	public slug: string = '';

	@JsonProperty('description', String)
	public description: string = '';

	@JsonProperty('images', Number)
	public imageCount: number = 0;

	@JsonProperty('namespace', String)
	public namespace: string = '';

	@JsonProperty('name_in_namespace', String)
	public nameInNamespace: string = '';

	@JsonProperty('category', String)
	public category: string = '';

	@JsonProperty('spoiler_image_uri', URLConverter)
	public spoilerImage: string = '';

	@JsonProperty('implied_tag_ids', [Number])
	private _impliedTags: number[] = new Array<number>();

	@JsonProperty('aliased_to_id', Number)
	private _aliasedTo: number = -1;

	public async impliedTags(): Promise<TagCollection> {
		return new TagCollection(this._impliedTags);
	}

	public async aliasedTo(): Promise<Tag | null> {
		if (this._aliasedTo === -1) return null;
		return Fetch.fetchTag(this._aliasedTo);
	}
}
