import { useLoaderData } from 'react-router-dom';
import { useActionData } from 'react-router-dom';

const CheckoutDone = () => {
	return <h1>Checkout done!</h1>;
};

export const action = async ({ request }) => {
	const data = await request.formData();
	console.log(data);

	return request;
};

export default CheckoutDone;
