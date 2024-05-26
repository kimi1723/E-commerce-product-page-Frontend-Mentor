import express from 'express';

import {
	postRetrieveProducts,
	postRetrieveProduct,
	postAddToCart,
	postRemoveFromCart,
	postCreateOrder,
} from './../controllers/shop';

const router = express.Router();

router.post('/products', postRetrieveProducts);

router.post('/products/:productId', postRetrieveProduct);

router.post('/add-to-cart/:productId/:quantity', postAddToCart);

router.post('/remove-from-cart/:productId/:quantity', postRemoveFromCart);

router.post('/create-order', postCreateOrder);

export { router as shopRoutes };
