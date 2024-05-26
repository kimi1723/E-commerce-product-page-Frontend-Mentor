import { RequestHandler } from 'express';

import { catchError } from '../utils/catchError';
import { Product } from '../models/product';
import { IProductQuery } from '../types/product';

export const postRetrieveProducts: RequestHandler = async (req, res, _next) => {
	const { gender, season } = req.query as IProductQuery;

	const filterQuery = {
		...(gender && { gender: { $in: ['unisex', gender] } }),
		...(season && { season: { $in: ['all', season] } }),
	};

	try {
		const products = await Product.find(filterQuery);

		return res.status(200).json({ products });
	} catch (err) {
		return catchError(err, res);
	}
};

export const postRetrieveProduct: RequestHandler = async (req, res, _next) => {};

export const postRetrieveCollections: RequestHandler = async (req, res, _next) => {};
