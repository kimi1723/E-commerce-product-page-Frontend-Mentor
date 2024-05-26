import express from 'express';
import { body } from 'express-validator';

import {
	postRetrieveUser,
	postRetrieveOrders,
	postRetrieveCredentials,
	postRetrievePersonalInfo,
} from '../controllers/account';

const router = express.Router();

router.post('/myaccount', postRetrieveUser);

router.post('/orders', postRetrieveOrders);

router.post('/credentials', postRetrieveCredentials);

router.post('/personal-information', postRetrievePersonalInfo);

export { router as accountRoutes };
