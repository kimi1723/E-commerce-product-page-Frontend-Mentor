import { Document, ObjectId } from 'mongoose';

export interface ICart {
	products?: { productId: string; quantity: number }[];
	totalQuantity?: number;
}

export interface IUser extends Document {
	_id: ObjectId;
	email: string;
	password: string;
	isActive: boolean;
	cart?: ICart;
	refreshToken?: string;
	refreshTokenExpiration?: number | Date;
	activateToken?: string;
	activateTokenExpiration?: number | Date;
}
