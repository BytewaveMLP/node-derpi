import { expect } from 'chai';
import 'mocha';

import { JsonConvert } from 'json2typescript';

import { Award } from '../lib/api/Award';

describe('awards', () => {
	let json = '{"image_url":"//derpicdn.net/media/2018/1/16/843293653e79dcf9eda164d.svg","title":"Friendship, Art, and Magic (6 Years)","id":19356,"label":"Celebrated Derpibooru\'s six year anniversary with friends.","awarded_on":"2018-01-16T07:51:13.209Z"}';
	let jsonObj = JSON.parse(json);
	let jsonConvert = new JsonConvert();

	it('should properly deserialize', () => {
		expect(() => jsonConvert.deserialize(jsonObj, Award)).to.not.throw();
	});

	it('should convert awarded_on to a Date in .awarded', () => {
		let award = jsonConvert.deserialize(jsonObj, Award);
		expect(award.awarded).to.be.a('Date');
		expect(award.awarded.getFullYear()).to.equal(2018);
	});

	it('should prepend https: to image_url in .image', () => {
		let award = jsonConvert.deserialize(jsonObj, Award);
		expect(award.image).to.equal('https:' + jsonObj.image_url);
	});
});
