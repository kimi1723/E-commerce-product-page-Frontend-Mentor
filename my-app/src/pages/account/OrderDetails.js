import { Await, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import OrderDetails from '../../components/account/orders/order-details/OrderDetails';
import getFirebaseData from '../../utils/getFirebaseData';
import LoaderSpinner from '../../components/ui/LoaderSpinner';

const OrderDetailsPage = () => {
	const { orderData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="order" />}>
			<Await resolve={orderData}>{loadedOrder => <OrderDetails orderData={loadedOrder} />}</Await>
		</Suspense>
	);
};

const orderDetailsLoader = async ({ orderId }) => {
	const email = localStorage.getItem('email');
	const orderData = await getFirebaseData(`users/emails/${email}/userOrders/${orderId}`);

	return orderData;
};

export const loader = ({ params }) => {
	return defer({
		orderData: orderDetailsLoader(params),
	});
};

export default OrderDetailsPage;
