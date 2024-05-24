import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import { validationResult } from 'express-validator';

import { User } from '../models/user';

import { RequestHandler } from 'express';
import { IUser } from '../types/user';
import { catchError } from '../utils/catchError';

const transporter = nodemailer.createTransport(
	sendgridTransport({ auth: { api_key: process.env.SENDGRID_API_KEY as string } }),
);

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

			return res.status(200).json({ message: 'Logged in successfuly!' });
		});
	} catch (err) {
		return catchError(err, res);
	}
};

export const postSignUp: RequestHandler = async (req, res, _next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) return res.status(422).json({ error: errors.array()[0].msg });

	const { email, password } = req.body;

	try {
		const isUser = (await User.findOne({
			email,
			$or: [{ isActive: true }, { activateTokenExpiration: { $gt: Date.now() } }],
		})) as IUser | undefined;

		if (isUser) return res.status(409).json({ error: 'User already exists!' });

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new User({ email, password: hashedPassword });

		crypto.randomBytes(32, async (err, buffer) => {
			if (err) throw new Error('Something went wrong while creating your account. Please try again later.');

			const token = buffer.toString('hex');

			user.activateToken = token;
			user.activateTokenExpiration = Date.now() + 3600000;
			user.isActive = false;

			await user.save();

			transporter.sendMail({
				to: email,
				from: process.env.SENDGRID_EMAIL_SENDER,
				subject: 'Activate your account',
				html: `<div><h1>In order to activate your account, click the link below.</h1></div>
				<a href="http://localhost:3000/activate-account/${token}">Click here</a> to activate your account.`,
			});

			return res.status(201).json({
				message: 'Account created successfuly! Please check your inbox to activate the account.',
			});
		});
	} catch (err) {
		return catchError(err, res);
	}
};

export const postLogout: RequestHandler = (req, res, _next) => {
	req.session.destroy(err => {
		if (err) return catchError(err, res);

		return res.status(200).json({ message: 'Logout successful!' });
	});
};

export const postResetPassword: RequestHandler = async (req, res, _next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) throw new Error("User with this email address doesn't exist!");

		crypto.randomBytes(32, async (err, buffer) => {
			if (err) throw new Error('Something went wrong with sending your refresh token. Please try again later.');

			const token = buffer.toString('hex');

			user.refreshToken = token;
			user.refreshTokenExpiration = Date.now() + 3600000;

			await user.save();

			transporter.sendMail({
				to: email,
				from: process.env.SENDGRID_EMAIL_SENDER,
				subject: 'You have requested a password reset',
				html: `<a href="http://localhost:3000/new-password/${token}">Click here</a> to reset your password.`,
			});

			return res.status(200).json({ message: 'Refresh token sent successfuly!' });
		});
	} catch (err) {
		return catchError(err, res);
	}
};

export const postNewPassword: RequestHandler = async (req, res, _next) => {
	const { password: newPassword } = req.body;
	const { refreshToken } = req.params;

	try {
		const user = await User.findOne({
			refreshToken,
			refreshTokenExpiration: { $gt: Date.now() },
		});

		if (!user) throw new Error("Password refresh token has expired. If that's not the case, please try again later.");

		const hashedPassword = await bcrypt.hash(newPassword, 12);

		user.password = hashedPassword;
		user.refreshToken = undefined;
		user.refreshTokenExpiration = undefined;

		await user.save();

		return res.status(200).json({ message: 'Password changed successfuly!' });
	} catch (err) {
		return catchError(err, res);
	}
};

export const postActivateAccount: RequestHandler = async (req, res, _next) => {
	const { activateToken } = req.params;

	try {
		const user = await User.findOne({ activateToken, activateTokenExpiration: { $gt: Date.now() } });

		if (!user)
			throw new Error(
				"Activation token has expired. If that's not the case, please try creating your account once again.",
			);

		user.activateToken = undefined;
		user.activateTokenExpiration = undefined;
		user.isActive = true;

		await user.save();

		return res.status(200).json({ message: 'Account successfuly activated!' });
	} catch (err) {
		return catchError(err, res);
	}
};

// export const postCheatActivateAccount: RequestHandler = async (req,res,_next) => {
// 	const {session} = req;
// 	session.user
// }
