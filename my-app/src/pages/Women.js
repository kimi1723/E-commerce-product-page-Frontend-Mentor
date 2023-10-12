import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Women from '../components/nav-sections/women/Women';
import LoaderSpinner from '../components/ui/LoaderSpinner';

import productsLoader from '../utils/loadProducts';

const WomenPage = () => {
	const { productsData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="women section" />}>
			<Await resolve={productsData}>{loadedProducts => <Women productsData={loadedProducts} />}</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const filter = 'female';
	const productsData = productsLoader(filter);

	return productsData;
};

export default WomenPage;
