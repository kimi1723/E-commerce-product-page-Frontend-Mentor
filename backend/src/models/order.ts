import { Schema, model } from 'mongoose';

import { cartSchema } from './user';
import { IOrder } from '../types/order';

const orderSchema = new Schema<IOrder>({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt: { type: Date, default: Date.now() },
	cart: cartSchema,
	discount: { type: String },
});

export const Order = model<IOrder>('Order', orderSchema);
