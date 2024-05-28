import { Schema, model } from 'mongoose';

import { IProduct } from '../types/product';

const productSchema = new Schema<IProduct>({
	annotation: { type: String, required: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	discount: { type: Number, required: true },
	imagesUrls: [{ imageUrl: { type: String, required: true } }],
	imagesAlts: [{ imageId: { type: String, required: true } }],
	description: { type: String },
	gender: { type: String },
	season: { type: String },
});

export const Product = model<IProduct>('Product', productSchema);
