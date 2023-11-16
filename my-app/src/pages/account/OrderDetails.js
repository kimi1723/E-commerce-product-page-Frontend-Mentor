import { defer, useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
	const params = useParams();

	return <h1>order details {params.orderId}</h1>;
};

const orderDetailsLoader = () => {};

const loader = () => {
	return defer({
		orderDetails: orderDetailsLoader(),
	});
};
export default OrderDetailsPage;
