import { ICart } from './../types/user';
import { RequestHandler } from 'express';

import { catchError } from '../utils/catchError';
import { Product } from '../models/product';
import { IProductQuery } from '../types/product';

import { checkId } from '../utils/checkId';
import { checkQuantity } from '../utils/checkQuantity';

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

	if (checkId(productId)) return res.status(400).json({ error: 'Invalid product id provided!' });

	try {
		const product = await Product.findById(productId);

		if (!product) throw new Error('Could not find this particular product. Please try again later.');

		return res.status(200).json({ product });
	} catch (err) {
		return catchError(err, res);
	}
};

export const postAddToCart: RequestHandler = async (req, res, _next) => {
	const { productId, quantity: stringQuantity } = req.params;
	const quantity = +stringQuantity;

	if (checkQuantity(quantity)) return res.status(400).json({ error: 'Invalid quantity provided!' });

	if (checkId(productId)) return res.status(400).json({ error: 'Invalid product id provided!' });

	try {
		const product = await Product.findById(productId).select('_id');

		if (!product) throw new Error('Product not found. Please try again later.');

		const cart: ICart = req.user ? req.user.cart || {} : req.session.cart || {};
		const cartProducts = cart.products || [];
		const cartProductIndex = cartProducts.findIndex(p => p.productId.toString() === productId);
		const updatedProducts = [...cartProducts];
		let totalQuantity = cart.totalQuantity || 0;

		if (cartProductIndex >= 0) {
			updatedProducts[cartProductIndex].quantity = cartProducts[cartProductIndex].quantity + quantity;
		} else {
			updatedProducts.push({ productId, quantity: quantity });
		}

		totalQuantity += quantity;

		const updatedCart = { products: [...updatedProducts], totalQuantity };

		if (req.user) {
			req.user.cart = updatedCart;
			await req.user.saveCart();

			return res.status(200).json({ cart: updatedCart });
		} else {
			req.session.cart = updatedCart;
			req.session.save(err => {
				if (err)
					throw new Error('Something went wrong while saving your cart. Please try again later or as an logged user.');

				return res.status(200).json({ cart: updatedCart });
			});
		}
	} catch (err) {
		return catchError(err, res);
	}
};
