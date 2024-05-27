import { ObjectId, Document } from 'mongoose';

import { ICart } from './user';

export interface IOrder extends Document {
	orderId: ObjectId;
	user: ObjectId;
	discount: {
		discountCode?: string;
		isDiscount: boolean;
	};
	cart: ICart;
	timestamp: number | Date;
}
