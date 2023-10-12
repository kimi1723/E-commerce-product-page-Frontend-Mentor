import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import productsLoader from '../utils/loadProducts';
import LoaderSpinner from '../components/ui/LoaderSpinner';

import Home from '../components/nav-sections/home/Home';

const HomePage = () => {
	const { productsData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="sneakers" />}>
			<Await resolve={productsData}>{loadedProducts => <Home productsData={loadedProducts} />}</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const filter = 'all';
	const productsData = productsLoader(filter);

	return productsData;
};

export default HomePage;
