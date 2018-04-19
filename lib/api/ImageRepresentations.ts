import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class ImageRepresentations {
	@JsonProperty('thumb_tiny', String)
	private _thumbnailTiny: string = '';

	get thumbnailTiny(): string {
		return 'https:' + this._thumbnailTiny;
	}

	@JsonProperty('thumb_small', String)
	private _thumbnailSmall: string = '';

	get thumbnailSmall(): string {
		return 'https:' + this._thumbnailSmall;
	}

	@JsonProperty('thumb', String)
	private _thumbnail: string = '';

	get thumbnail(): string {
		return 'https:' + this._thumbnail;
	}

	@JsonProperty('small', String)
	private _small: string = '';

	get small(): string {
		return 'https:' + this._small;
	}

	@JsonProperty('medium', String)
	private _medium: string = '';

	get medium(): string {
		return 'https:' + this._medium;
	}

	@JsonProperty('large', String)
	private _large: string = '';

	get large(): string {
		return 'https:' + this._large;
	}

	@JsonProperty('tall', String)
	private _tall: string = '';

	get tall(): string {
		return 'https:' + this._tall;
	}

	@JsonProperty('full', String)
	private _full: string = '';

	get full(): string {
		return 'https:' + this._full;
	}
}
