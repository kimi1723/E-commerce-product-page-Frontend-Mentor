import { Await, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import Orders from '../../components/account/orders/Orders';
import getFirebaseData from '../../utils/getFirebaseData';
import LoaderSpinner from '../../components/ui/LoaderSpinner';

const OrdersPage = () => {
	const { ordersData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner />}>
			<Await resolve={ordersData}>{loadedOrders => <Orders ordersData={loadedOrders} />}</Await>
		</Suspense>
	);
};

const ordersLoader = async () => {
	const email = localStorage.getItem('email');
	const ordersData = (await getFirebaseData(`users/emails/${email}/userOrders`)) || {};
	console.log(ordersData);

	return Object.values(ordersData);
};

export const loader = () => {
	return defer({
		ordersData: ordersLoader(),
	});
};

export default OrdersPage;
