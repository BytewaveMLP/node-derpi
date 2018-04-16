import { User } from './User';

export class Image {
	public id: number;
	public created: Date;
	public updated: Date;
	public firstSeen: Date;
	public score: number;
	public comments: number;
	public width: number;
	public height: number;
	public fileName: string;
	public description: string;
	public uploader: User;
}
