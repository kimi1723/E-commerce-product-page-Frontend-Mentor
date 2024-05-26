import { Document, ObjectId } from 'mongoose';

export interface IProduct extends Document {
	productId: ObjectId;
	title: string;
	description: string;
	gender: string;
	price: number;
	season: string;
	imagesAlts: { imageId: string }[];
	imagesUrls: { imageUrl: string }[];
	discount: number;
}

export interface IProductQuery {
	gender?: string;
	season?: string;
}
