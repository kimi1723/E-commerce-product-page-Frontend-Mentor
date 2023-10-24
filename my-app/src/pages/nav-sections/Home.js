import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import productsLoader from '../../utils/loadProducts';
import LoaderSpinner from '../../components/ui/LoaderSpinner';

import ProductsPage from '../../components/nav-sections/generic/ProductsPage';

const HomePage = () => {
	const { productsData } = useLoaderData();
	const title = 'sneakers';

	return (
		<Suspense fallback={<LoaderSpinner title={title} />}>
			<Await resolve={productsData}>
				{loadedProducts => <ProductsPage productsData={loadedProducts} title={title} />}
			</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const filter = { gender: 'all' };
	const productsData = productsLoader(filter);

	return productsData;
};

export default HomePage;
