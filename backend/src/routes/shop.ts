import express from 'express';
import { body } from 'express-validator';

import { postRetrieveProducts, postRetrieveProduct, postRetrieveCollections } from './../controllers/shop';

const router = express.Router();

router.post('/products', postRetrieveProducts);

router.post('/products/:productId', postRetrieveProduct);

router.post('/collections', postRetrieveCollections);

export { router as shopRoutes };
