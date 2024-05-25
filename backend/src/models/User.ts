import { Schema, model } from 'mongoose';
import { IProduct, IUser } from '../types/user';

const productSchema = new Schema<IProduct>({
	productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
	quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUser>({
	email: { type: String, required: true },
	password: { type: String, required: true },
	isActive: { type: Boolean, required: true },
	cart: {
		products: [productSchema],
	},
	orders: {
		discount: {
			discountCode: { type: String },
			isDiscount: { type: Boolean, required: true },
		},
		products: [productSchema],
		orderId: { type: Schema.Types.ObjectId, required: true },
		timestamp: { type: Date, required: true },
	},
	refreshToken: { type: String },
	refreshTokenExpiration: { type: Date },
	activateToken: { type: String },
	activateTokenExpiration: { type: Date },
});

export const User = model<IUser>('User', userSchema);
