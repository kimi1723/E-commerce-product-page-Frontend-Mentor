import { ObjectId, Document } from 'mongoose';

import { ICart } from './user';

export interface IOrder extends Document {
	_id: ObjectId;
	user?: ObjectId;
	discount?: string;
	cart: ICart;
	createdAt: Date;
}
