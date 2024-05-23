import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
	email: { type: String, required: true },
	password: { type: String, required: true },
	refreshToken: { type: String },
	refreshTokenExpiration: { type: Date },
});

export const User = model<IUser>('User', userSchema);
