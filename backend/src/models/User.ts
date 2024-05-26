import { Schema, model } from 'mongoose';
import { ICart, IOrders, IUser } from '../types/user';

export const cartSchema = new Schema<ICart>({
	products: [
		{
			productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
			quantity: { type: Number, required: true },
		},
	],
	totalQuantity: { type: Number },
});

const ordersSchema = new Schema<IOrders>({
	discount: {
		discountCode: { type: String },
		isDiscount: { type: Boolean, required: true },
	},
	cart: cartSchema,
	orderId: { type: Schema.Types.ObjectId, required: true },
	timestamp: { type: Date, required: true },
});

const userSchema = new Schema<IUser>({
	email: { type: String, required: true },
	password: { type: String, required: true },
	isActive: { type: Boolean, required: true },
	cart: cartSchema,
	orders: {
		type: ordersSchema,
		required: false,
	},
	refreshToken: { type: String },
	refreshTokenExpiration: { type: Date },
	activateToken: { type: String },
	activateTokenExpiration: { type: Date },
});

userSchema.methods.saveCart = async function () {
	await this.save();
};

export const User = model<IUser>('User', userSchema);
