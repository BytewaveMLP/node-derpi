import { URLConverter } from '../util/URLConverter';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class ImageRepresentations {
	@JsonProperty('thumb_tiny', URLConverter)
	public thumbnailTiny: string = '';

	@JsonProperty('thumb_small', URLConverter)
	public thumbnailSmall: string = '';

	@JsonProperty('thumb', URLConverter)
	public thumbnail: string = '';

	@JsonProperty('small', URLConverter)
	public small: string = '';

	@JsonProperty('medium', URLConverter)
	public medium: string = '';

	@JsonProperty('large', URLConverter)
	public large: string = '';

	@JsonProperty('tall', URLConverter)
	public tall: string = '';

	@JsonProperty('full', URLConverter)
	public full: string = '';
}
