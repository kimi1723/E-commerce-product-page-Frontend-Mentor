import { Await, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import Orders from '../../components/account/orders/Orders';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import getProductsData from '../../utils/getProductsData';

const OrdersPage = () => {
	const { ordersData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title={'orders'} />}>
			<Await resolve={ordersData}>{loadedOrders => <Orders ordersData={loadedOrders} />}</Await>
		</Suspense>
	);
};

const ordersLoader = async () => {
	const email = localStorage.getItem('email');
	const ordersData = await getProductsData(`users/emails/${email}/userOrders`);

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
