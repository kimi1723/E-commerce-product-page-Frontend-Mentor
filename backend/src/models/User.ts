import { Schema, model } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema<IUser>({
	email: { type: String, required: true },
	password: { type: String, required: true },
	isActive: { type: Boolean, required: true },
	cart: {
		products: [
			{
				productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
				quantity: { type: Number, required: true },
			},
		],
	},
	refreshToken: { type: String },
	refreshTokenExpiration: { type: Date },
	activateToken: { type: String },
	activateTokenExpiration: { type: Date },
});

export const User = model<IUser>('User', userSchema);
