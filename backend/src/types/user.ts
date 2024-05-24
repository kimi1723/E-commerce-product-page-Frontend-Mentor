import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
	_id: ObjectId;
	email: string;
	password: string;
	isActive: boolean;
	cart: {
		// totalQuantity: number;
		// totalPrice: number;
		products: {
			productId: string;
			quantity: number;
		}[];
	};
	refreshToken?: string;
	refreshTokenExpiration?: number | Date;
	activateToken?: string;
	activateTokenExpiration?: number | Date;
}
