import { defer } from 'react-router-dom';

import getProductsData from './getProductsData';
import getImages from './getImages';

const loadProducts = async filter => {
	const productsData = [];

	const data = await getProductsData('/products');

	if (data.error) {
		return data;
	}

	for (const id in data) {
		if (filter.gender === 'all' || filter.gender.includes(data[id].gender) || filter.season === data[id].season) {
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
