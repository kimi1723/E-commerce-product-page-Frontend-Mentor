import express from 'express';
import { param, body } from 'express-validator';
import { Types } from 'mongoose';

import {
	postRetrieveProducts,
	postRetrieveProduct,
	postAddToCart,
	postRemoveFromCart,
	postCreateOrder,
	postAddDiscount,
} from './../controllers/shop';

import { ICart } from '../types/user';

const router = express.Router();

const productIdValidation = param('productId')
	.custom(value => Types.ObjectId.isValid(value))
	.withMessage('Invalid product ID!');

const productValidation = [
	productIdValidation,
	param('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a posivite integer!'),
];

router.post('/products', postRetrieveProducts);

router.post('/products/:productId', productIdValidation, postRetrieveProduct);

router.post('/add-to-cart/:productId/:quantity', productValidation, postAddToCart);

router.post('/remove-from-cart/:productId/:quantity', productValidation, postRemoveFromCart);

router.post(
	'/add-discount',
	body('discountCode').notEmpty().isString().withMessage('Inproper discount code!'),
	postAddDiscount,
);

router.post(
	'/create-order',
	[
		body('cart')
			.custom((_value, { req }) => {
				const cart: ICart = req.user ? req.user.cart : req.session.cart;

				if (!cart.products || cart.products.length < 0) return;

				return true;
			})
			.withMessage('You have no products in your cart!'),
	],
	postCreateOrder,
);

export { router as shopRoutes };
