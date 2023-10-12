import { defer } from 'react-router-dom';

import getProductsData from './getProductsData';
import getImages from './getImages';

export const loadProducts = async () => {
	const productsData = [];

	const data = await getProductsData('/products');

	for (const id in data) {
		const imagesUrls = await getImages(id, 'two');

		const newProduct = { ...data[id], imagesUrls, id };

		productsData.push(newProduct);
	}

	return productsData;
};

export const productsLoader = () => {
	return defer({
		productsData: loadProducts(),
	});
};

export default productsLoader;
