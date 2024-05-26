import { Document, ObjectId } from 'mongoose';

export interface ICart {
	products?: { productId: string; quantity: number }[];
	totalQuantity?: number;
}

export interface IOrders {
	discount: {
		discountCode?: string;
		isDiscount: boolean;
	};
	orderId: ObjectId;
	cart: ICart;
	timestamp: number | Date;
}
export interface IUser extends Document {
	_id: ObjectId;
	email: string;
	password: string;
	isActive: boolean;
	cart?: ICart;
	orders?: IOrders[];
	refreshToken?: string;
	refreshTokenExpiration?: number | Date;
	activateToken?: string;
	activateTokenExpiration?: number | Date;
	saveCart: () => Promise<void>;
}
