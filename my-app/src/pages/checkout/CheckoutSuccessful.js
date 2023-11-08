import { useLoaderData } from 'react-router-dom';
import { useActionData } from 'react-router-dom';

import CheckoutSuccessful from '../../components/checkout/successful/CheckoutSuccessful';

const CheckoutSuccessfulPage = () => {
	const data = useActionData();


	return <CheckoutSuccessful data={data}/>;
};

export const action = async ({ request }) => {
	const data = await request.formData();

	return data;
};

export default CheckoutSuccessfulPage;
