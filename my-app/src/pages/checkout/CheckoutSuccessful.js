import { useLoaderData } from 'react-router-dom';
import { useActionData } from 'react-router-dom';

import CheckoutSuccessful from '../../components/checkout/successful/CheckoutSuccessful';

const CheckoutSuccessfulPage = () => {
	return <CheckoutSuccessful />;
};

export const action = async ({ request }) => {
	// const data = await request.formData();
	const data = {
		name: 'Patrick',
		email: 'email@gm.pl',
		tel: '123456789',
		address: 'ulica',
		'zip-code': '12345',
		city: 'Warsaw',
		country: 'Poland',
		'payment-method': 'card',
	};

	console.log(data);

	return request;
};

export default CheckoutSuccessfulPage;
