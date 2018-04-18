import { TagDetails } from './TagDetails';
import { Image } from './Image';

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Tag {
	@JsonProperty('tag', TagDetails)
	public details: TagDetails = new TagDetails();

	// TODO: image generator, based on ?page= query param
}
