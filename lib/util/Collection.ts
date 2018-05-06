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

	/**
	 * Gets an element from the collection by its key
	 *
	 * @abstract
	 * @param {T1} id The key of the element to get
	 * @returns {Promise<T2>} A Promise wrapping the retrieved item
	 * @memberof Collection
	 */
	public async abstract get(id: T1): Promise<T2>;

	/**
	 * Gets a random element from the collection
	 *
	 * @returns {(Promise<T2 | null>)} A Promise wrapping the retrieved value (null if no items in the collection)
	 * @memberof Collection
	 */
	public async random(): Promise<T2 | null> {
		if (this._ids.length === 0) return null;

		const random = this._ids[Math.floor(Math.random() * this._ids.length)];
		return this.get(random);
	}

	/**
	 * Gets the first item in the collection
	 *
	 * @returns {(Promise<T2 | null>)} A Promise wrapping the retrieved value (null if no items in the collection)
	 * @memberof Collection
	 */
	public async first(): Promise<T2 | null> {
		if (this._ids.length === 0) return null;

		const first = this._ids[0];
		return this.get(first);
	}

	/**
	 * Gets the last item in the collection
	 *
	 * @returns {(Promise<T2 | null>)} A Promise wrapping the retrieved value (null if no items in the collection)
	 * @memberof Collection
	 */
	public async last(): Promise<T2 | null> {
		if (this._ids.length === 0) return null;

		const last = this._ids[this._ids.length - 1];
		return this.get(last);
	}

	/**
	 * Finds the first item in the collection matching some condition
	 *
	 * @param {Function} fn The function to filter elements with
	 * @returns {(Promise<T2 | null>)} The found value (null if no items in the collection that match)
	 * @memberof Collection
	 */
	public async find(fn: Function): Promise<T2 | null> {
		for await (const value of this) {
			if (fn(value)) return value;
		}

		return null;
	}

	/**
	 * Maps all elements of the collection over some function
	 *
	 * @template T The type of array to return
	 * @param {Function} fn The function to map to every element in the collection
	 * @returns {Promise<T[]>} A Promise wrapping the array returned
	 * @memberof Collection
	 */
	public async map<T>(fn: Function): Promise<T[]> {
		let arr: T[] = [];

		for await (const value of this) {
			arr.push(fn(value));
		}

		return arr;
	}

	/**
	 * Returns true if some of the elements in the collection match some conditional function
	 *
	 * @param {Function} fn The function used to check each element
	 * @returns {Promise<boolean>} A Promise wrapping a boolean stating whether or not the condition matched at least one element
	 * @memberof Collection
	 */
	public async some(fn: Function): Promise<boolean> {
		for await (const value of this) {
			if (fn(value)) return true;
		}

		return false;
	}

	/**
	 * Returns true if every element in the collection matches some conditional
	 *
	 * @param {Function} fn The function used to check each element
	 * @returns {Promise<boolean>} A Promise wrapping a boolean stating whether or not the condition matched every element
	 * @memberof Collection
	 */
	public async every(fn: Function): Promise<boolean> {
		if (this._ids.length === 0) return false;

		for await (const value of this) {
			if (!fn(value)) return false;
		}

		return true;
	}

	/**
	 * Reduces the collection into some value
	 *
	 * Similar to Array#reduce
	 *
	 * @template T The type of the accumulator
	 * @param {Function} fn The function used to reduce each element ()
	 * @param {T} initialAcc The initial value for the accumulator
	 * @returns {Promise<T>} A Promise wrapping the final accumulator value
	 * @memberof Collection
	 */
	public async reduce<T>(fn: Function, initialAcc: T): Promise<T> {
		let acc = initialAcc;

		for await (const value of this) {
			fn(acc, value);
		}

		return acc;
	}

	/**
	 * Identical to map, but returns this instead of an array
	 *
	 * @see map
	 * @param {Function} fn The function to map over each element
	 * @returns {Promise<Collection<T1, T2>>} The current collection
	 * @memberof Collection
	 */
	public async tap(fn: Function): Promise<Collection<T1, T2>> {
		for await (const value of this) {
			fn(value);
		}

		return this;
	}

	/**
	 * Fetches the next element in the collection, as well as whether or not iteration is done
	 *
	 * @returns {Promise<IteratorResult<T2>>} The next element
	 * @memberof Collection
	 */
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
