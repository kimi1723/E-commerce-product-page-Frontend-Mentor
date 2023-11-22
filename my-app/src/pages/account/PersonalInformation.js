import { Suspense } from 'react';
import { Await, defer, useActionData, useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PersonalInformation from '../../components/account/personal-information/PersonalInformation';
import getProductsData from '../../utils/getProductsData';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import getUid from '../../utils/getUid';
import setFirebaseData from '../../utils/setFirebaseData';
import { errorActions } from '../../store/error-slice';
import { userDataActions } from '../../store/userData-slice';

const PersonalInformationPage = () => {
	const { personalInformationLoaderData } = useLoaderData();
	const personalInformationActionData = useActionData();
	const dispatch = useDispatch();
	const credentials = useSelector(state => state.userData.personalInformation);

	const changeCredentials = async () => {
		try {
			const isEmailChanged = personalInformationActionData.email ? true : false;
			const uid = await getUid();
			const userAccountUid = await getUid('accountUid');

			let emailToSet, passwordToSet;

			if (isEmailChanged) {
				const { password } = await personalInformationLoaderData;
				passwordToSet = password;
				emailToSet = personalInformationActionData.email;
			} else {
				const { email } = await personalInformationLoaderData;
				passwordToSet = personalInformationActionData.password;
				emailToSet = email;
			}

			const responseData = { email: emailToSet, password: passwordToSet };

			const response = await setFirebaseData(`/users/validated/${userAccountUid}/credentials`, responseData);
			const anonymousResponse = await setFirebaseData(`users/anonymousTokens/${uid}/credentials`, {
				...responseData,
				userAccountUid,
			});

			if (response.status === 500 || anonymousResponse === 500) {
				throw new Error(response.error || anonymousResponse.error);
			}
		} catch (error) {
			dispatch(
				errorActions.setError({
					isError: true,
					message: {
						content: 'An unexpected error happened',
						error: error.code || error.message,
					},
				}),
			);
		}
	};

	if (personalInformationActionData) {
		changeCredentials();
	}
	// useffect
	// if(!personalInformationActionData) dispatch(userDataActions.handlePersonalInformaiton())

	return (
		<Suspense fallback={<LoaderSpinner title="personal information" />}>
			<Await resolve={personalInformationLoaderData}>{loadedData => <PersonalInformation data={loadedData} />}</Await>
		</Suspense>
	);
};

const personalInformationLoader = async () => {
	const uid = await getUid('accountUid');
	const { email, password } = await getProductsData(`users/validated/${uid}/credentials`);

	return { email, password };
};

export const action = async ({ request }) => {
	const formData = await request.formData();
	const email = formData.get('email');
	const password = formData.get('password');

	return { email, password };
};

export const loader = () => {
	return defer({
		personalInformationLoaderData: personalInformationLoader(),
	});
};
export default PersonalInformationPage;
