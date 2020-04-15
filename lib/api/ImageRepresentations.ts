import { URLConverter } from '../util/URLConverter';

import { JsonObject, JsonProperty } from 'json2typescript';

/**
 * Represents the various representations (heh) of an image
 *
 * @export
 * @class ImageRepresentations
 */
@JsonObject('ImageRepresentations')
export class ImageRepresentations {
	/**
	 * The smallest rendered size of the image
	 *
	 * Dimensions: 50x50
	 *
	 * @readonly
	 * @type {string}
	 * @memberof ImageRepresentations
	 */
	@JsonProperty('thumb_tiny', URLConverter)
	public readonly thumbnailTiny: string = '';

	/**
	 * A 150x150 thumbnail for the image
	 *
	 * @readonly
	 * @type {string}
	 * @memberof ImageRepresentations
	 */
	@JsonProperty('thumb_small', URLConverter)
	public readonly thumbnailSmall: string = '';

	/**
	 * A 250x250 thumbnail for the image
	 *
	 * @readonly
	 * @type {string}
	 * @memberof ImageRepresentations
	 */
	@JsonProperty('thumb', URLConverter)
	public readonly thumbnail: string = '';

	/**
	 * An approximately 300x300 rendering of the image
	 *
	 * @readonly
	 * @type {string}
	 * @memberof ImageRepresentations
	 */
	@JsonProperty('small', URLConverter)
	public readonly small: string = '';

	/**
	 * An approximately 750x750 rendering of the image
	 *
	 * @readonly
	 * @type {string}
	 * @memberof ImageRepresentations
	 */
	@JsonProperty('medium', URLConverter)
	public readonly medium: string = '';

	/**
	 * An approximately 1500x1500 rendering of the image
	 *
	 * @readonly
	 * @type {string}
	 * @memberof ImageRepresentations
	 */
	@JsonProperty('large', URLConverter)
	public readonly large: string = '';

	/**
	 * An approximately 1024x1024 (?) rendering of the image
	 *
	 * @readonly
	 * @type {string}
	 * @memberof ImageRepresentations
	 */
	@JsonProperty('tall', URLConverter)
	public readonly tall: string = '';

	/**
	 * A source-quality rendering of the image
	 *
	 * @readonly
	 * @type {string}
	 * @memberof ImageRepresentations
	 */
	@JsonProperty('full', URLConverter)
	public readonly full: string = '';

	/**
	 * A WEBM rendering of the image, if it's a gif or webm upload
	 *
	 * Optional
	 *
	 * @type {string}
	 * @memberof ImageRepresentations
	 */
	@JsonProperty('webm', URLConverter, true)
	public readonly webm?: string = undefined;

	/**
	 * An MP4 rendering of the image, if it's a gif or webm upload
	 *
	 * Optional
	 *
	 * @type {string}
	 * @memberof ImageRepresentations
	 */
	@JsonProperty('mp4', URLConverter, true)
	public readonly mp4?: string = undefined;
}
