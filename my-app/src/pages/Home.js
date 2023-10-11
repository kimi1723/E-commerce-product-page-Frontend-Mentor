import { Suspense } from 'react';
import { useLoaderData, Await, defer, json } from 'react-router-dom';

import getProductsData from '../utils/getProductsData';
import getImages from '../utils/getImages';
import Home from '../components/home/Home';

const HomePage = () => {
	const { products } = useLoaderData();

	return (
		<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
			<Await resolve={products}>{loadedProducts => <Home products={loadedProducts} />}</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const products = [];

	const data = await getProductsData('/products');

	for (const id in data) {
		const imagesUrls = await getImages(id, 'two');

		const newProduct = { ...data[id], imagesUrls, id };

		products.push(newProduct);
	}

	return products;
};

export const productsLoader = () => {
	return defer({
		products: loader(),
	});
};

export default HomePage;
