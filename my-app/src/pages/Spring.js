import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import LoaderSpinner from '../components/ui/LoaderSpinner';

import productsLoader from '../utils/loadProducts';
import ProductsPage from '../components/nav-sections/ProductsPage';

const SpringPage = () => {
	const { productsData } = useLoaderData();
	const title = 'spring collection';

	return (
		<Suspense fallback={<LoaderSpinner title={title} />}>
			<Await resolve={productsData}>
				{loadedProducts => <ProductsPage productsData={loadedProducts} title={title} />}
			</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const filter = { gender: [], season: 'spring' };
	const productsData = productsLoader(filter);

	return productsData;
};

export default SpringPage;
