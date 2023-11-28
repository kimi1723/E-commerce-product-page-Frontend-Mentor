import { Suspense } from 'react';
import { Await, useLoaderData, defer } from 'react-router-dom';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import Details from '../../components/checkout/details/CheckoutDetails';
import getFirebaseData from '../../utils/getFirebaseData';
import getUid from '../../utils/getUid';

const CheckoutDetailsPage = () => {
	const { checkoutLoader } = useLoaderData();

	const title = 'checkout';

	return (
		<Suspense fallback={<LoaderSpinner title={title} />}>
			<Await resolve={checkoutLoader}>{loadedData => <Details loadedData={loadedData} />}</Await>
		</Suspense>
	);
};

// const checkoutPredefinedDataLoader = async () => {
// 	const uid = await getUid();
// 	const isSignedIn = await getFirebaseData(`users/anonymousTokens/${uid}/isSignedIn/status`);

// 	if (!isSignedIn) return null;

// 	const accountUid = await getUid('accountUid');
// 	const data = await getFirebaseData(`users/validated/${accountUid}/personalInformation`);

// 	return data;
// };

const checkoutLoader = async () => {
	const data = {};
	const countriesData = await fetch('https://countriesnow.space/api/v0.1/countries/population');
	const countriesDataJson = await countriesData.json();
	const countries = await countriesDataJson.data;

	const uid = await getUid();
	const isSignedIn = await getFirebaseData(`users/anonymousTokens/${uid}/isSignedIn/status`);

	if (isSignedIn) {
		const accountUid = await getUid('accountUid');
		const personalInformation = await getFirebaseData(`users/validated/${accountUid}/personalInformation`);

		data['personalInformation'] = personalInformation;
	}

	countries.splice(0, 46);

	const countriesList = countries.map(country => {
		return { value: country.country, label: country.country };
	});

	data['countriesList'] = countriesList;

	return data;
};

export const loader = () => {
	return defer({
		checkoutLoader: checkoutLoader(),
		// predefinedData: checkoutPredefinedDataLoader(),
	});
};

export default CheckoutDetailsPage;
