import express from 'express';
import { body } from 'express-validator';

import {
	postRetrieveUser,
	postRetrieveOrders,
	postRetrieveCredentials,
	postRetrievePersonalInfo,
} from '../controllers/user';

const router = express.Router();

router.post('/account', postRetrieveUser);

router.post('/orders', postRetrieveOrders);

router.post('/credentials', postRetrieveCredentials);

router.post('/personal-information', postRetrievePersonalInfo);
