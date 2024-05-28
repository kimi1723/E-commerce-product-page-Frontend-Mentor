import { Document, ObjectId } from 'mongoose';

export interface IProduct extends Document {
	productId: ObjectId;
	annotation: string;
	name: string;
	price: number;
	discount: number;
	imagesAlts: { imageId: string }[];
	imagesUrls: { imageUrl: string }[];
	description?: string;
	gender?: string;
	season?: string;
}

export interface IProductQuery {
	gender?: string;
	season?: string;
}
