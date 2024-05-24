import { Document } from 'mongoose';

export interface IUser extends Document {
	_id: string;
	email: string;
	password: string;
	refreshToken?: string;
	refreshTokenExpiration?: number | Date;
	activateToken?: string;
	activateTokenExpiration?: number | Date;
	isActive: boolean;
}
