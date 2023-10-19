import { Suspense } from 'react';
import { Await, useLoaderData, defer } from 'react-router-dom';
import Checkout from '../components/checkout/Checkout';
import LoaderSpinner from '../components/ui/LoaderSpinner';

const CheckoutPage = () => {
	const { countriesData } = useLoaderData();
	const title = 'checkout';

	return (
		<Suspense fallback={<LoaderSpinner title={title} />}>
			<Await resolve={countriesData}>{loadedCountries => <Checkout countriesList={loadedCountries} />}</Await>
		</Suspense>
	);
};

const checkoutLoader = async () => {
	const data = await fetch('https://countriesnow.space/api/v0.1/countries/population');
	const countriesData = await data.json();
	const countries = countriesData.data;

	const countriesList = countries.map(country => {
		return { value: country.country, label: country.country };
	});

	return countriesList;
};

export const loader = () => {
	return defer({
		countriesData: checkoutLoader(),
	});
};

export default CheckoutPage;
