import { Document } from 'mongoose';

export interface IDiscount extends Document {
	discountCode: string;
	discountType: 'all' | { gender?: string; season?: string };
	expirationDate: Date;
	discountValue?: number;
}
