import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import PersonalInformation from '../../components/account/personal-information/PersonalInformation';
import getProductsData from '../../utils/getProductsData';
import LoaderSpinner from '../../components/ui/LoaderSpinner';

const PersonalInformationPage = () => {
	const { personalInformationData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="personal information" />}>
			<Await resolve={personalInformationData}>{loadedData => <PersonalInformation data={loadedData} />}</Await>
		</Suspense>
	);
};

const personalInformationLoader = async () => {
	const email = localStorage.getItem('email');
	const password = await getProductsData(`users/emails/${email}/password`);

	return { email, password };
};

export const action = e => {
	e.preventDefault();
	console.log('action');
};

export const loader = () => {
	return defer({
		personalInformationData: personalInformationLoader(),
	});
};
export default PersonalInformationPage;
