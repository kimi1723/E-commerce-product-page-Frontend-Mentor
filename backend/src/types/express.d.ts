import { ICart, IUser } from './user';
import { productSchema } from '../models/user';
declare module 'express-serve-static-core' {
	interface Request {
		user?: IUser;
	}
}

declare module 'express-session' {
	interface SessionData {
		user?: IUser;
		isLoggedIn?: boolean;
		cart?: ICart;
	}
}
