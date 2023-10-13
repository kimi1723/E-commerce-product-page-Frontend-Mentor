import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Fall from '../components/nav-sections/collections/Fall';
import LoaderSpinner from '../components/ui/LoaderSpinner';

import productsLoader from '../utils/loadProducts';

const FallPage = () => {
	const { productsData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="fall collection" />}>
			<Await resolve={productsData}>{loadedProducts => <Fall productsData={loadedProducts} />}</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const filter = { gender: [], season: 'fall' };
	const productsData = productsLoader(filter);

	return productsData;
};

export default FallPage;
