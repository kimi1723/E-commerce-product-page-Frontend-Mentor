import express from 'express';
import { param } from 'express-validator';
import { Types } from 'mongoose';

import {
	postRetrieveProducts,
	postRetrieveProduct,
	postAddToCart,
	postRemoveFromCart,
	postCreateOrder,
} from './../controllers/shop';

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

router.post('/create-order', postCreateOrder);

export { router as shopRoutes };
