import { defer, useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
	const params = useParams();

	return <h1>order details {params.orderId}</h1>;
};

const orderDetailsLoader = async params => {
	// const id = params.orderId;

	console.log(params);

	return params;
};

export const loader = ({ params }) => {
	return defer({
		orderDetails: orderDetailsLoader(params),
	});
};

export default OrderDetailsPage;
