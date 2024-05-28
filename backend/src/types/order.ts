import { ObjectId, Document } from 'mongoose';

import { ICart } from './user';

export interface IOrder extends Document {
	_id: ObjectId;
	cart: ICart;
	createdAt: Date;
	user?: ObjectId;
	discount?: string;
}
