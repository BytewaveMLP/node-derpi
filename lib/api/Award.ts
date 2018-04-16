export class Award {
	/**
	 * The image URL for the ward
	 *
	 * @type {string}
	 * @memberof Award
	 */
	public image: string;

	/**
	 * The title of the award
	 *
	 * @type {string}
	 * @memberof Award
	 */
	public title: string;

	/**
	 * The internal ID of the award
	 *
	 * @type {number}
	 * @memberof Award
	 */
	public id: number;

	/**
	 * The award's description, if any
	 *
	 * @type {string?}
	 * @memberof Award
	 */
	public label?: string;

	/**
	 * The date the award was given on
	 *
	 * @type {Date}
	 * @memberof Award
	 */
	public awarded: Date;
}
