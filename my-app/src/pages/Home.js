import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import productsLoader from '../utils/loadProducts';

import Home from '../components/nav-sections/home/Home';

const HomePage = () => {
	const { productsData } = useLoaderData();

	return (
		<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
			<Await resolve={productsData}>{loadedProducts => <Home productsData={loadedProducts} />}</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const productsData = productsLoader();

	return productsData;
};

export default HomePage;
