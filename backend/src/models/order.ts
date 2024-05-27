import { Schema, model } from 'mongoose';

import { cartSchema } from './user';
import { IOrder } from '../types/order';

const orderSchema = new Schema<IOrder>({
	orderId: { type: Schema.Types.ObjectId, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	discount: {
		discountCode: { type: String },
		isDiscount: { type: Boolean, required: true },
	},
	cart: cartSchema,
	timestamp: { type: Date, required: true },
});

export const Order = model<IOrder>('Order', orderSchema);
