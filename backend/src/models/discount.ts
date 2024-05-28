import { model, Schema } from 'mongoose';

import { IDiscount } from '../types/discount';

const discountSchema = new Schema<IDiscount>({
	discountCode: { type: String, required: true },
	discountType: { type: Schema.Types.Mixed, required: true },
	expirationDate: { type: Date, required: true },
	discountValue: { type: Number },
});

export const Discount = model<IDiscount>('Discount', discountSchema);
