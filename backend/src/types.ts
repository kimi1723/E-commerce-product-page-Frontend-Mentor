import { Document } from 'mongoose';

export interface IUser extends Document {
	_id: string;
	email: string;
	password: string;
	refreshToken?: String;
	refreshTokenExpiration?: Date;
}

declare module 'express-serve-static-core' {
	export interface Request {
		user?: IUser;
	}
}

declare module 'express-session' {
	interface SessionData {
		user?: IUser;
		isLoggedIn?: boolean;
	}
}
