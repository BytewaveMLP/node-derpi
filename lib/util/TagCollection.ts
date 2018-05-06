import { Collection } from './Collection';
import { Tag } from '../api/Tag';
import { Fetch } from './Fetch';

/**
 * A collection of tags - helpful for fetching a list of tags while only making enough HTTP requests to satisfy needs
 *
 * @export
 * @class TagCollection
 * @extends {Collection<number, Tag>}
 */
export class TagCollection extends Collection<number, Tag> {
	public async get(id: number): Promise<Tag> {
		let tag = this._cache.get(id);

		if (!tag) {
			tag = await Fetch.fetchTagByID(id);
			this._cache.set(id, tag);
		}

		return tag;
	}
}
