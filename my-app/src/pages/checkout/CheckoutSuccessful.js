import { useActionData } from 'react-router-dom';

import CheckoutSuccessful from '../../components/checkout/successful/CheckoutSuccessful';

const CheckoutSuccessfulPage = () => {
	const userData = useActionData();

	return <CheckoutSuccessful userData={userData} />;
};

export const action = async ({ request }) => {
	const data = await request.formData();
	console.log(data);

	return data;
};

export default CheckoutSuccessfulPage;
