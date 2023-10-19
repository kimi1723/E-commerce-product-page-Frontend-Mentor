import { Suspense } from 'react';
import { Await, useLoaderData, defer } from 'react-router-dom';
import Checkout from '../components/checkout/Checkout';
import LoaderSpinner from '../components/ui/LoaderSpinner';

const CheckoutPage = () => {
	const title = 'checkout';
	const { countriesList } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title={title} />}>
			<Await resolve={countriesList}>{loadedCountries => <Checkout countriesList={countriesList} />}</Await>
		</Suspense>
	);
};

const checkoutLoader = async () => {
	fetch('https://countriesnow.space/api/v0.1/countries/population')
		.then(res => res.json())
		.then(data => console.log(data));
	// .then(data => console.log(JSON.stringify(data)));
};

export const loader = () => {
	return defer({
		countriesData: checkoutLoader(),
	});
};

export default CheckoutPage;
