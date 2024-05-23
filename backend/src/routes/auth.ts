import express from 'express';
import { check, body } from 'express-validator';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { postLogin, postLogout, postSignUp } from '../controllers/auth';

const router = express.Router();

router.post(
	'/login',
	[
		check('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
		check('password')
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
	[
		check('email')
			.isEmail()
			.withMessage('Please enter a valid email address')
			.normalizeEmail()
			.custom(async (value, { req }) => {
				const { email } = req.body;
				const user = await User.findOne({ email });

				if (user) throw new Error('User with provided email address already exists');

				return true;
			}),
		check('password').trim().isLength({ min: 8 }).isAlphanumeric(),
	],
	postSignUp,
);

router.post('/logout', postLogout);
