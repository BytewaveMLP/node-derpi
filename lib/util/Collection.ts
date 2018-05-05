/**
 * A readonly collection type
 *
 * @export
 * @abstract
 * @class Collection
 * @template T1 The type of keys in the collection
 * @template T2 The type of values in the collection
 */
export abstract class Collection<T1, T2> implements AsyncIterable<T2> {
	protected _cache: Map<T1, T2> = new Map<T1, T2>();

	protected _pointer = 0;
	protected _ids: T1[];

	constructor(keys: T1[]) {
		this._ids = keys;
	}

	public async abstract get(id: T1): Promise<T2>;

	public async random(): Promise<T2 | null> {
		if (this._ids.length === 0) return null;

		const random = this._ids[Math.floor(Math.random() * this._ids.length)];
		return this.get(random);
	}

	public async first(): Promise<T2 | null> {
		if (this._ids.length === 0) return null;

		const first = this._ids[0];
		return this.get(first);
	}

	public async last(): Promise<T2 | null> {
		if (this._ids.length === 0) return null;

		const last = this._ids[this._ids.length - 1];
		return this.get(last);
	}

	public async find(fn: Function): Promise<T2 | null> {
		for await (const value of this) {
			if (fn(value)) return value;
		}

		return null;
	}

	public async map<T>(fn: Function): Promise<T[]> {
		let arr: T[] = [];

		for await (const value of this) {
			arr.push(fn(value));
		}

		return arr;
	}

	public async some(fn: Function): Promise<boolean> {
		for await (const value of this) {
			if (fn(value)) return true;
		}

		return false;
	}

	public async every(fn: Function): Promise<boolean> {
		if (this._ids.length === 0) return false;

		for await (const value of this) {
			if (!fn(value)) return false;
		}

		return true;
	}

	public async reduce<T>(fn: Function, initialAcc: T): Promise<T> {
		let acc = initialAcc;

		for await (const value of this) {
			fn(fn, acc);
		}

		return acc;
	}

	public async tap(fn: Function): Promise<Collection<T1, T2>> {
		for await (const value of this) {
			fn(value);
		}

		return this;
	}

	public async next(): Promise<IteratorResult<T2>> {
		if (this._pointer >= this._ids.length) {
			/* tslint:disable-next-line */
			return {
				done: true,
				value: (undefined as any)
			};
		}

		return {
			done: false,
			value: await this.get(this._ids[this._pointer++])
		};
	}

	[Symbol.asyncIterator](): AsyncIterableIterator<T2> {
		return this;
	}
}
