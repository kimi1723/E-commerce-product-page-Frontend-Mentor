import { RequestHandler } from 'express';

import { catchError } from '../utils/catchError';
import { Product } from '../models/product';
import { IProductQuery } from '../types/product';

// TO ADD: images
export const postRetrieveProducts: RequestHandler = async (req, res, _next) => {
	const { gender, season } = req.query as IProductQuery;

	const filterQuery = {
		...(gender && { gender: { $in: ['unisex', gender] } }),
		...(season && { season: { $in: ['all', season] } }),
	};

	try {
		const products = await Product.aggregate([
			{ $match: filterQuery },
			{
				$project: {
					annotation: 1,
					name: 1,
					price: 1,
					discount: 1,
					imagesAlts: {
						image1: 1,
						image2: 1,
					},
				},
			},
		]);
		return res.status(200).json({ products });
	} catch (err) {
		return catchError(err, res);
	}
};

export const postRetrieveProduct: RequestHandler = async (req, res, _next) => {
	const { productId } = req.params;

	try {
		const product = await Product.findById(productId);

		return res.status(200).json({ product });
	} catch (err) {
		return catchError(err, res);
	}
};

export const postRetrieveCollections: RequestHandler = async (req, res, _next) => {};
