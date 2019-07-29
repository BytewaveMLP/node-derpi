/**
 * These tests kind of suck.
 * I'm slowly working on them, but I really don't have much experience with this kind of stuff.
 * If anyone wants to help out and write tests, it would be much appreciated!
 */

import { use, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';

import { JsonConvert, ValueCheckingMode } from 'json2typescript';

import { Award } from '../lib/api/Award';
import { User } from '../lib/api/User';
import { Link } from '../lib/api/Link';
import { Fetch, ResultSortFormat, ResultSortOrder } from '../lib/util/Fetch';

use(chaiAsPromised);

describe('Data classes', () => {
	describe('Award', () => {
		let json = '{"image_url":"//derpicdn.net/media/2018/1/16/843293653e79dcf9eda164d.svg","title":"Friendship, Art, and Magic (6 Years)","id":19356,"label":"Celebrated Derpibooru\'s six year anniversary with friends.","awarded_on":"2018-01-16T07:51:13.209Z"}';
		let jsonObj = JSON.parse(json);
		let jsonConvert = new JsonConvert();

		it('should properly deserialize', () => {
			expect(() => jsonConvert.deserialize(jsonObj, Award)).to.not.throw();
		});

		it('should convert awarded_on to a Date in .awarded', () => {
			let award = jsonConvert.deserialize(jsonObj, Award) as Award;
			expect(award.awarded).to.be.a('Date');
			expect(award.awarded.getFullYear()).to.equal(2018);
		});

		it('should prepend https: to image_url in .image', () => {
			let award = jsonConvert.deserialize(jsonObj, Award) as Award;
			expect(award.image).to.equal('https:' + jsonObj.image_url);
		});
	});

	describe('User', () => {
		let json = '{"id":340598,"name":"Geljado","slug":"Geljado","role":"user","description":"The saddest \'pony\' on earth.","avatar_url":"//derpicdn.net/avatars/2015/6/9/781000fa6c52e384d752ca6.png","created_at":"2015-06-09T19:55:25.781Z","comment_count":192,"uploads_count":102,"post_count":3,"topic_count":0,"links":[{"user_id":340598,"created_at":"2017-04-26T04:43:52.795Z","state":"verified","tag_id":299010}],"awards":[{"image_url":"//derpicdn.net/media/2016/8/23/540676fb2fd6546ee45a1c1.svg","title":"Artist","id":15904,"label":null,"awarded_on":"2017-04-26T11:21:15.250Z"},{"image_url":"//derpicdn.net/media/2018/1/16/843293653e79dcf9eda164d.svg","title":"Friendship, Art, and Magic (6 Years)","id":19404,"label":"Celebrated Derpibooru\'s six year anniversary with friends.","awarded_on":"2018-01-17T02:43:11.207Z"}]}';
		let jsonObj = JSON.parse(json);
		let jsonConvert = new JsonConvert();
		jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

		it('should properly deserialize', () => {
			expect(() => jsonConvert.deserialize(jsonObj, User)).to.not.throw();
		});

		it('should convert links to an Array<Link>', () => {
			let user: User = jsonConvert.deserialize(jsonObj, User);
			expect(user.links).to.be.a('Array');
			let link: Link = user.links[0];
			expect(link).to.haveOwnProperty('state');
			expect(link.created).to.be.a('Date');
		});

		it('should convert awards to an Array<Award>', () => {
			let user: User = jsonConvert.deserialize(jsonObj, User);
			expect(user.awards).to.be.a('Array');
			let award: Award = user.awards[0];
			expect(award.awarded).to.be.a('Date');
		});
	});
});

describe('HTTP fetching', () => {
	Fetch.setup();

	describe('fetchUser', () => {
		it('should fetch a valid user', () => {
			return expect(Fetch.fetchUser('Bytewave'))
				.to.be.fulfilled
				.and.to.eventually.have.property('name')
				.that.equals('Bytewave');
		});
	});

	describe('fetchImage', () => {
		it('should fetch a valid image', () => {
			return expect(Fetch.fetchImage(1587999))
				.to.be.fulfilled
				.and.to.eventually.have.property('id')
				.that.equals(1587999);
		});

		it('should fetch the tags on an image', (done) => {
			Fetch.fetchImage(1587999).then(image => {
				image.tags().then(async tags => {
					let firstTag = await tags.first();
					try {
						expect(firstTag)
							.to.have.property('details')
							.that.has.property('name');
						done();
					} catch (err) {
						done(err);
					}
				});
			});
		});

		it('should transparently handle duplicate images', () => {
			return expect(Fetch.fetchImage(567343))
				.to.eventually.have.property('id')
				.that.equals(567591);
		});
	});

	describe('fetchTag', () => {
		it('should fetch a valid tag', () => {
			return expect(Fetch.fetchTag('rainbow dash'))
				.to.be.fulfilled
				.and.to.eventually.have.property('details')
				.that.has.property('name')
				.that.equals('rainbow dash');
		});
	});

	describe('search', () => {
		it('should produce valid search results', () => {
			return expect(Fetch.search({
				sortFormat: ResultSortFormat.CREATION_DATE,
				sortOrder: ResultSortOrder.ASCENDING
			}))
				.to.be.fulfilled
				.and.to.eventually.have.property('images')
				.that.has.lengthOf.above(0);
		});

		it('should handle next page fetching correctly', async () => {
			let results = await Fetch.search({
				sortFormat: ResultSortFormat.CREATION_DATE,
				sortOrder: ResultSortOrder.ASCENDING
			});

			return expect(results.fetchNextPage())
				.to.be.fulfilled
				.and.to.eventually.have.property('images')
				.that.has.lengthOf.above(0);
		});
	});
});
