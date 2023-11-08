import { Suspense } from 'react';
import { Await, useLoaderData, defer } from 'react-router-dom';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import Details from '../../components/checkout/details/CheckoutDetails';

const CheckoutDetailsPage = () => {
	const { countriesData } = useLoaderData();
	const title = 'checkout';

	return (
		<Suspense fallback={<LoaderSpinner title={title} />}>
			<Await resolve={countriesData}>{loadedCountries => <Details countriesList={loadedCountries} />}</Await>
		</Suspense>
	);
};

const checkoutDetailsLoader = async () => {
	const data = await fetch('https://countriesnow.space/api/v0.1/countries/population');
	const countriesData = await data.json();
	const countries = countriesData.data;
	countries.splice(0, 46);

	const countriesList = countries.map(country => {
		return { value: country.country, label: country.country };
	});

	return countriesList;
};

export const loader = () => {
	return defer({
		countriesData: checkoutDetailsLoader(),
	});
};

export default CheckoutDetailsPage;
