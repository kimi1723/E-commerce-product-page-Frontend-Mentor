import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Men from '../components/nav-sections/men/Men';
import LoaderSpinner from '../components/ui/LoaderSpinner';

import productsLoader from '../utils/loadProducts';

const MenPage = () => {
	const { productsData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="men section" />}>
			<Await resolve={productsData}>{loadedProducts => <Men productsData={loadedProducts} />}</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const filter = { gender: ['unisex', 'male'] };
	const productsData = productsLoader(filter);

	return productsData;
};

export default MenPage;
