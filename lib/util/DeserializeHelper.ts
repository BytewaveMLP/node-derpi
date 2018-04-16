export class DeserializeHelper {
	/**
	 * Deserialize JSON into a strongly-typed object
	 *
	 * @static
	 * @template T
	 * @param {T} obj - the object to deserialize into
	 * @param {string} json - the JSON to deserialize with
	 * @returns {T}
	 * @memberof DeserializeHelper
	 */
	static jsonToInstance<T>(obj: T, json: string): T {
		let jsonObj = JSON.parse(json);

		return this.objToInstance<T>(obj, jsonObj);
	}

	static objToInstance<T>(obj: T, jsonObj: any): T {
		if (typeof (obj as any)['fromJSON'] === 'function') {
			(obj as any)['fromJSON'](jsonObj);
		}

		return obj;
	}
}
