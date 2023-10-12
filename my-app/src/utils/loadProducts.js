import { defer } from 'react-router-dom';

import getProductsData from './getProductsData';
import getImages from './getImages';

const loadProducts = async filter => {
	const productsData = [];
	const data = await getProductsData('/products');

	for (const id in data) {
		if (filter === 'all' || data[id].gender === filter || data[id].gender === 'unisex') {
			const imagesUrls = await getImages(id, 'two');

			const newProduct = { ...data[id], imagesUrls, id };
			productsData.push(newProduct);
		}
	}

	return productsData;
};

const productsLoader = filter => {
	return defer({
		productsData: loadProducts(filter),
	});
};

export default productsLoader;
