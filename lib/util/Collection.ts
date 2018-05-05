/**
 * A readonly collection type
 *
 * @export
 * @abstract
 * @class Collection
 * @template T1 The type of keys in the collection
 * @template T2 The type of values in the collection
 */
export abstract class Collection<T1, T2> implements Iterable<Promise<T2>> {
	protected _pointer = 0;
	protected _ids: T1[];
	protected _cache: Map<T1, Promise<T2>>;

	constructor(keys: T1[]) {
		this._ids = keys;
		this._cache = new Map<T1, Promise<T2>>();
	}

	public abstract get(id: T1): Promise<T2>;
	public abstract random(): Promise<T2>;
	public abstract first(): Promise<T2>;
	public abstract last(): Promise<T2>;
	public abstract find(search: Function): Promise<T2>;
	public abstract map<T>(map: Function): T[];
	public abstract some(conditional: Function): boolean;
	public abstract every(conditional: Function): boolean;
	public abstract reduce<T>(reducer: Function): T;
	public abstract tap(fn: Function): Collection<T1, T2>;
	public abstract filter(filter: Function): Collection<T1, T2>;

	public next(): IteratorResult<Promise< T2>> {
		if (this._pointer >= this._ids.length) {
			/* tslint:disable-next-line */
			return {
				done: true,
				value: (undefined as any)
			};
		}

		return {
			done: false,
			value: this.get(this._ids[this._pointer++])
		};
	}

	[Symbol.iterator](): IterableIterator<Promise<T2>> {
		return this;
	}
}
