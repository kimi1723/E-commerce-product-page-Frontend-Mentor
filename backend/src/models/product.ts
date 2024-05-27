import { Schema, model } from 'mongoose';

import { IProduct } from '../types/product';

const productSchema = new Schema<IProduct>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	gender: { type: String, required: true },
	price: { type: Number, required: true },
	season: { type: String, required: true },
	imagesAlts: [
		{
			imageId: { type: String, required: true },
		},
	],
	imagesUrls: [{ imageUrl: { type: String, required: true } }],
	discount: { type: Number },
});

export const Product = model<IProduct>('Product', productSchema);
