import express from 'express';
import { body } from 'express-validator';

import { postRetrieveProducts, postRetrieveProduct } from './../controllers/shop';

const router = express.Router();

router.post('/products', postRetrieveProducts);

router.post('/products/:productId', postRetrieveProduct);

export { router as shopRoutes };
