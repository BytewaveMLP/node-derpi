import { Tag } from './Tag';

import { JsonObject, JsonProperty } from 'json2typescript';

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

	@JsonProperty('implied_tag_ids', [Number])
	private _impliedTags: number[] = new Array<number>();

	get impliedTags(): Tag[] {
		// TODO: fetch
		return new Array<Tag>();
	}

	@JsonProperty('alised_to_id', Number)
	private _aliasedTo: number = -1;

	get aliasedTo(): Tag | null {
		if (this._aliasedTo === -1) return null;
		// TODO: deserialize tag
		return new Tag();
	}

	@JsonProperty('spoiler_image_url', String)
	private _spoilerImage: string = '';

	get spoilerImage(): string {
		return 'https:' + this._spoilerImage;
	}
}
