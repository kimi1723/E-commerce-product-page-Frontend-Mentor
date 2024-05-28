import { Response } from 'express';

// TO DO: FIX ERROR HANDLING
export const catchError = (err: unknown, res: Response, code = 500) => {
	let errorMessage = 'Something went wrong. Please try again later.';

	if (err instanceof Error) errorMessage = err.message;

	res.status(code).json({ error: errorMessage });
};
