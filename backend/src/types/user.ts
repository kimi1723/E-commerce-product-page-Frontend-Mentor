import { Document, ObjectId } from 'mongoose';

export interface ICart {
	products?: { productId: ObjectId; quantity: number }[];
	totalQuantity?: number;
}

export interface IUser extends Document {
	_id: ObjectId;
	email: string;
	password: string;
	isActive: boolean;
	cart?: ICart;
	orders?: {
		discount: {
			discountCode?: string;
			isDiscount: boolean;
		};
		orderId: ObjectId;
		cart: ICart;
		timestamp: number | Date;
	}[];
	refreshToken?: string;
	refreshTokenExpiration?: number | Date;
	activateToken?: string;
	activateTokenExpiration?: number | Date;
}
