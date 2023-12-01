import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import LoaderSpinner from '../../components/ui/loader-spinner/LoaderSpinner';

import productsLoader from '../../utils/loadProducts';
import ProductsPage from '../../components/nav-sections/ProductsPage';

const MenPage = () => {
	const { productsData } = useLoaderData();
	const title = 'men';

	return (
		<Suspense fallback={<LoaderSpinner title={title} />}>
			<Await resolve={productsData}>
				{loadedProducts => <ProductsPage productsData={loadedProducts} title={title} />}
			</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const filter = { gender: ['unisex', 'male'] };
	const productsData = productsLoader(filter);

	return productsData;
};

export default MenPage;
