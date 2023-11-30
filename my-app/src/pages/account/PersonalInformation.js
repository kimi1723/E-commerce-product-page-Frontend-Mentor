import { Suspense, useEffect } from 'react';
import { Await, defer, useActionData, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PersonalInformation from '../../components/account/personal-information/PersonalInformation';
import LoaderSpinner from '../../components/ui/LoaderSpinner';

import getFirebaseData from '../../utils/getFirebaseData';
import getUid from '../../utils/getUid';
import setFirebaseData from '../../utils/setFirebaseData';
import { errorActions } from '../../store/error-slice';
import { toast } from 'sonner';

const personalInformationSkeleton = {
	address: '',
	city: '',
	country: '',
	email: '',
	name: '',
	tel: '',
	zipCode: '',
};

const PersonalInformationPage = () => {
	const { personalInformationLoaderData } = useLoaderData();
	const changedValue = useActionData();
	const dispatch = useDispatch();

	useEffect(() => {
		if (changedValue) {
			const changePersonalInformation = async () => {
				try {
					const previousData = (await personalInformationLoaderData) || personalInformationSkeleton;
					const userAccountUid = await getUid('accountUid');

					const newData = { ...previousData, ...changedValue };

					const response = await setFirebaseData(`/users/validated/${userAccountUid}/personalInformation`, newData);

					if (response.status !== 200) throw new Error(response.error);

					return newData;
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

			changePersonalInformation();
			toast.success(`Your ${Object.keys(changedValue)[0]} has been changed succesfully!`);
		}
	}, [changedValue, dispatch, personalInformationLoaderData]);

	return (
		<Suspense fallback={<LoaderSpinner title="personal information" />}>
			<Await resolve={personalInformationLoaderData}>{loadedData => <PersonalInformation data={loadedData} />}</Await>
		</Suspense>
	);
};

export const action = async ({ request }) => {
	const formData = await request.formData();

	return Object.fromEntries(formData);
};

const personalInformationLoader = async () => {
	const uid = await getUid('accountUid');
	const personalInformationLoaderData = await getFirebaseData(`/users/validated/${uid}/personalInformation`);

	return personalInformationLoaderData;
};

export const loader = () => {
	return defer({
		personalInformationLoaderData: personalInformationLoader(),
	});
};

export default PersonalInformationPage;
