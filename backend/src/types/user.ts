import { Document, ObjectId } from 'mongoose';

export interface IProduct {
	productId: ObjectId;
	quantity: number;
}
export interface IUser extends Document {
	_id: ObjectId;
	email: string;
	password: string;
	isActive: boolean;
	cart: {
		// totalQuantity: number;
		// totalPrice: number;
		products: [IProduct];
	};
	orders: {
		discount: {
			discountCode?: string;
			isDiscount: boolean;
		};
		orderId: ObjectId;
		products: [IProduct];
		timestamp: number | Date;
	}[];
	refreshToken?: string;
	refreshTokenExpiration?: number | Date;
	activateToken?: string;
	activateTokenExpiration?: number | Date;
}
