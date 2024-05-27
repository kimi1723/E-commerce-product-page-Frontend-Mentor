import { Schema, model } from 'mongoose';

import { cartSchema } from './user';
import { IOrder } from '../types/order';

const orderSchema = new Schema<IOrder>({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	discount: { type: String },
	cart: cartSchema,
	createdAt: { type: Date, default: Date.now() },
});

export const Order = model<IOrder>('Order', orderSchema);
