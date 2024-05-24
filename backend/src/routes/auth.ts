import express from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcryptjs';

import { User } from '../models/User';
import { postLogin, postLogout, postNewPassword, postResetPassword, postSignUp } from '../controllers/auth';

const router = express.Router();

router.post(
	'/login',
	[
		body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
		body('password')
			.trim()
			.custom(async (value, { req }) => {
				const { email } = req.body;
				const user = await User.findOne({ email });

				if (!user) throw new Error("User with provided email address doesn't exist");

				const isValidPassword = await bcrypt.compare(value, user.password);

				if (!isValidPassword) throw new Error('Provided password is invalid!');

				return true;
			}),
	],
	postLogin,
);

router.post(
	'/signup',
	body('email')
		.isEmail()
		.withMessage('Please enter a valid email address')
		.normalizeEmail()
		.custom(async (_value, { req }) => {
			const { email } = req.body;
			const user = await User.findOne({ email });

			if (user) throw new Error('User with provided email address already exists');

			return true;
		}),
	body('password').trim().isLength({ min: 8 }).isAlphanumeric(),
	postSignUp,
);

router.post('/logout', postLogout);

router.post(
	'/reset-password',
	body('email')
		.isEmail()
		.withMessage('Please enter a valid email address')
		.normalizeEmail()
		.custom(async (_value, { req }) => {
			const { email } = req.body;
			const user = await User.findOne({ email });

			if (user) throw new Error('User with provided email address already exists');

			return true;
		}),
	postResetPassword,
);

router.post('/new-password', [body('password').trim().isLength({ min: 8 }).isAlphanumeric()], postNewPassword);

export { router as authRoutes };
