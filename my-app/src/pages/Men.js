import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Men from '../components/nav-sections/men/Men';

import productsLoader from '../utils/loadProducts';

const MenPage = () => {
	const { productsData } = useLoaderData();

	return (
		<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
			<Await resolve={productsData}>{loadedProducts => <Men productsData={loadedProducts} />}</Await>
		</Suspense>
	);
};

export const loader = async () => {
	const filter = 'male';
	const productsData = productsLoader(filter);

	return productsData;
};

export default MenPage;
