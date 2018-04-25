import { User } from '../api/User';
import * as URLs from '../util/URLs';
import * as Consts from '../util/Consts';

import * as request from 'request';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';

export class Fetch {
	private jsonConvert: JsonConvert;

	constructor() {
		this.jsonConvert = new JsonConvert();
		this.jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
	}

	public async fetchUser(identifier: string | number): Promise<User> {
		return new Promise<User>((resolve, reject) => {
			const options = Object.assign({}, Consts.DEFAULT_REQUEST_OPTS, {
				uri: URLs.USER_URL.replace('{}', (identifier as string)),
			});

			request.get(options, (err: any, response: request.Response, body: any) => {
				if (err) {
					reject(err);
				} else {
					const status = response.statusCode;
					if (status !== Consts.HTTP_200_OK && status !== Consts.HTTP_301_MOVED_PERMANENTLY) {
						reject(new Error(`Received status code ${status}`));
					} else {
						resolve(this.jsonConvert.deserializeObject(body, User));
					}
				}
			});
		});
	}
}
