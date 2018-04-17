import { Link } from './Link';
import { Award } from './Award';

export class User {
	public id: number;
	public name: string;
	public slug: string;
	public role: string;
	public description: string;
	public avatar: string;
	public created: Date;
	public comments: number;
	public uploads: number;
	public posts: number;
	public topics: number;

	private _linksUnserialized: Array<Object>;
	private _links?: Array<Link>;
	private _awardsUnserialized: Array<Object>;
	private _awards?: Array<Award>;

	get awards(): Array<Award> {
		if (this._awards === undefined) {
			this._awards = new Array<Award>();

			for (let award in this._awardsUnserialized) {
				// this._awards.push(DeserializeHelper.objToInstance<Award>(new Award(), award));
			}
		}

		return this._awards;
	}

	get links(): Array<Link> {
		if (this._links === undefined) {
			this._links = new Array<Link>();

			for (let link in this._linksUnserialized) {
				// this._links.push(DeserializeHelper.objToInstance<Link>(new Link(), link));
			}
		}

		return this._links;
	}
}
