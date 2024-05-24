import { Document, ObjectId } from 'mongoose';

export interface IProduct extends Document {
	productId: ObjectId;
	title: string;
	description: string;
	gender: string;
	price: number;
	season: string;
	imagesAlts: { imageId: string }[];
	discount: number;
}
