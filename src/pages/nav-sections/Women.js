import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import ProductsPage from '../../components/nav-sections/ProductsPage';
import LoaderSpinner from '../../components/ui/loader-spinner/LoaderSpinner';

import productsLoader from '../../utils/loadProducts';

const WomenPage = () => {
	const { productsData } = useLoaderData();
	const title = 'women';

	return (
		<Suspense fallback={<LoaderSpinner title={title} />}>
			<Await resolve={productsData}>
				{loadedProducts => <ProductsPage productsData={loadedProducts} title={title} />}
			</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const filter = { gender: ['female', 'unisex'] };
	const productsData = productsLoader(filter);

	return productsData;
};

export default WomenPage;
