import { defer } from 'react-router-dom';

import getProductsData from './getProductsData';
import getImages from './getImages';

const loadProducts = async filter => {
	const productsData = [];

	try {
		const data = await getProductsData('/products');

		for (const id in data) {
			if (filter.gender === 'all' || filter.gender.includes(data[id].gender) || filter.season === data[id].season) {
				const imagesUrls = await getImages(id, 'two');

				const newProduct = { ...data[id], imagesUrls, id };
				productsData.push(newProduct);
			}
		}
	} catch (error) {
		console.log('error');
	}
	return productsData;
};

const productsLoader = filter => {
	return defer({
		productsData: loadProducts(filter),
	});
};

export default productsLoader;
