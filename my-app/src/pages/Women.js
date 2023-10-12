import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Women from '../components/nav-sections/women/Women';

import productsLoader from '../utils/loadProducts';

const WomenPage = () => {
	const { productsData } = useLoaderData();

	return (
		<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
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
