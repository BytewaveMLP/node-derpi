import { User } from '../api/User';

import * as request from 'request-promise-native';

export class Fetch {
	public static async fetchJSON(url: string, param: string) {
		let body = await request.get(url.replace('{}', param), { json: true, headers: { 'User-Agent': 'node-derpi' } });
		return body;
	}
}
