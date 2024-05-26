import { ICart } from './../types/user';
import { RequestHandler } from 'express';

import { catchError } from '../utils/catchError';
import { Product } from '../models/product';
import { IProductQuery } from '../types/product';
import { User } from '../models/user';

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

		if (!products) throw new Error('Could not find any products. Please try again later.');

		return res.status(200).json({ products });
	} catch (err) {
		return catchError(err, res);
	}
};

export const postRetrieveProduct: RequestHandler = async (req, res, _next) => {
	const { productId } = req.params;

	try {
		const product = await Product.findById(productId);

		if (!product) throw new Error('Could not find this particular product. Please try again later.');

		return res.status(200).json({ product });
	} catch (err) {
		return catchError(err, res);
	}
};

export const postAddToCart: RequestHandler = async (req, res, _next) => {
	const { productId } = req.params;

	if (!req.user) {
		const cart: ICart = req.session.cart || {};

		
	}
	return res.status(200).json({ message: 'added' });
};
