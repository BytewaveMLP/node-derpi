import { Collection } from './Collection';
import { Tag } from '../api/Tag';
import { Fetch } from './Fetch';

export class TagCollection extends Collection<number, Tag> {
	public async get(id: number): Promise<Tag> {
		let tag = this._cache.get(id);

		if (!tag) {
			Fetch.setup();
			tag = await Fetch.fetchTag(id);
			this._cache.set(id, tag);
		}

		return tag;
	}
}
