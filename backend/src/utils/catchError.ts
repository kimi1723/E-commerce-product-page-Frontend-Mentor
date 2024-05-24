import { Response } from 'express';

export const catchError = (err: unknown, res: Response, code = 500) => {
	let errorMessage = 'Something went wrong. Please try again later.';

	if (typeof err === 'string') errorMessage = err;

	res.status(code).json({ error: errorMessage });
};
