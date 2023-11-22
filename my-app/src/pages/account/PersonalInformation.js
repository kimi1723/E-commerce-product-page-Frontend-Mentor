import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import PersonalInformation from '../../components/account/personal-information/PersonalInformation';
import getProductsData from '../../utils/getProductsData';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import getUid from '../../utils/getAnonymousToken';

const PersonalInformationPage = () => {
	const { personalInformationData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="personal information" />}>
			<Await resolve={personalInformationData}>{loadedData => <PersonalInformation data={loadedData} />}</Await>
		</Suspense>
	);
};

const personalInformationLoader = async () => {
	const uid = await getUid(true);
	const { email, password } = await getProductsData(`users/validated/${uid}/credentials`);

	return { email, password };
};

export const action = e => {
	e.preventDefault();
	console.log(e);
};

export const loader = () => {
	return defer({
		personalInformationData: personalInformationLoader(),
	});
};
export default PersonalInformationPage;
