import { Await, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import Orders from '../../components/account/orders/Orders';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import getProductsData from '../../utils/getProductsData';
import getUid from '../../utils/getUid';

const OrdersPage = () => {
	const { ordersData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title={'orders'} />}>
			<Await resolve={ordersData}>{loadedOrders => <Orders ordersData={loadedOrders} />}</Await>
		</Suspense>
	);
};

const ordersLoader = async () => {
	const uid = await getUid(true);
	const ordersData = await getProductsData(`users/validated/${uid}/userOrders`);

	if (ordersData === null) return ordersData;

	if (ordersData.error) return { error: ordersData.error.message };

	return Object.values(ordersData);
};

export const loader = () => {
	return defer({
		ordersData: ordersLoader(),
	});
};

export default OrdersPage;
