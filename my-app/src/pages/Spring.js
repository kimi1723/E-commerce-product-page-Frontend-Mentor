import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Spring from '../components/nav-sections/collections/Spring';
import LoaderSpinner from '../components/ui/LoaderSpinner';

import productsLoader from '../utils/loadProducts';

const SpringPage = () => {
	const { productsData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="spring collection" />}>
			<Await resolve={productsData}>{loadedProducts => <Spring productsData={loadedProducts} />}</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const filter = { gender: [], season: 'spring' };
	const productsData = productsLoader(filter);

	return productsData;
};

export default SpringPage;
