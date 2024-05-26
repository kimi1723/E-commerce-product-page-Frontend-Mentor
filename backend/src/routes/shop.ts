import express from 'express';

import { postRetrieveProducts, postRetrieveProduct, postAddToCart } from './../controllers/shop';

const router = express.Router();

router.post('/products', postRetrieveProducts);

router.post('/products/:productId', postRetrieveProduct);

router.post('/add-to-cart/:productId/:quantity', postAddToCart);

export { router as shopRoutes };
