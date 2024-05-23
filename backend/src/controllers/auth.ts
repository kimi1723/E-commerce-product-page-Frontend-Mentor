import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { validationResult } from 'express-validator';
import { User } from '../models/User';

import { RequestHandler } from 'express';
import { IUser } from '../types';

export const postLogin: RequestHandler = async (req, res, _next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) return res.status(422).json({ error: errors.array()[0].msg });

	const { email } = req.body;

	try {
		const user = (await User.findOne({ email })) as IUser;

		req.session.user = user;
		req.session.isLoggedIn = true;
		req.session.save(err => {
			if (err) throw new Error('Something went wrong creating your session. Please, try again later');
		});
	} catch (err) {
		let errorMessage = 'Something went wrong. Please try again later.';

		if (typeof err === 'string') errorMessage = err;

		return res.status(500).json({ error: errorMessage });
	}
};

export const postSignUp: RequestHandler = async (req, res, _next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) return res.status(422).json({ error: errors.array()[0].msg });

	const { email, password } = req.body;

	try {
		const isUser = (await User.findOne({ email })) as IUser | undefined;

		if (isUser) return res.status(409).json({ error: 'User already exists!' });

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = new User({ email, password: hashedPassword });

		await user.save();

		return res.status(200).json({ message: 'Account created successfuly!' });
	} catch (err) {
		return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
	}
};

export const postLogout: RequestHandler = (req, res, _next) => {
	req.session.destroy(err => {
		if (err) return res.status(500).json({ error: 'Something went wrong. Please try again later.' });

		return res.status(200).json({ message: 'Logout successful!' });
	});
};
