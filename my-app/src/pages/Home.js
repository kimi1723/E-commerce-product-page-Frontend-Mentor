import { Suspense } from 'react';
import { useLoaderData, Await, defer } from 'react-router-dom';

import getProductsData from '../utils/getProductsData';
import getImages from '../utils/getImages';
import Home from '../components/home/Home';

const HomePage = () => {
	const { productsData } = useLoaderData();

	return (
		<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
			<Await resolve={productsData}>{loadedProducts => <Home productsData={loadedProducts} />}</Await>
		</Suspense>
	);
};

export const loader = async () => {
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
		productsData: loader(),
	});
};

export default HomePage;
