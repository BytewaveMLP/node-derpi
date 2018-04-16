import { User } from '../api/User';

import * as http from 'http';
import { DeserializeHelper } from './DeserializeHelper';

export const USER_URL = 'https://derpibooru.org/profiles/{}.json';

export class Fetch {
	public static user(identifier: string | number, callback: Function) {
		this.fetchJSON(USER_URL, identifier, (err: Error, body: string) => {
			if (err) {
				callback(err);
			} else {
				callback(null, DeserializeHelper.jsonToInstance<User>(new User(), body));
			}
		});
	}

	private static fetchJSON(url: string, param: any, callback: Function) {
		http.get(url.replace('{}', param), res => {
			let body = '';

			res.on('data', chunk => {
				body += chunk;
			});

			res.on('end', () => {
				callback(null, body);
			});
		}).on('error', err => {
			callback(err);
		});
	}
}
