import { Suspense, useEffect } from 'react';
import { Await, defer, useActionData, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Credentials from '../../components/account/credentials/Credentials';
import getProductsData from '../../utils/getProductsData';
import LoaderSpinner from '../../components/ui/loader-spinner/LoaderSpinner';
import getUid from '../../utils/getUid';
import setFirebaseData from '../../utils/setFirebaseData';
import { errorActions } from '../../store/error-slice';
import { toast } from 'sonner';

const CredentialsPage = () => {
	const { credentialsLoaderData } = useLoaderData();
	const changedValue = useActionData();
	const dispatch = useDispatch();

	useEffect(() => {
		if (changedValue) {
			const changeCredentials = async () => {
				try {
					const uid = await getUid();
					const userAccountUid = await getUid('accountUid');
					const previousData = await credentialsLoaderData;
					const changedDataKey = Object.keys(changedValue);

					if (Object.values(changedValue)[0] === previousData[changedDataKey]) return;

					const newData = { ...previousData, ...changedValue };

					const response = await setFirebaseData(`/users/validated/${userAccountUid}/credentials`, newData);
					const anonymousResponse = await setFirebaseData(`users/anonymousTokens/${uid}/credentials`, {
						...newData,
						userAccountUid,
					});

					if (response.status === 500 || anonymousResponse === 500)
						throw new Error(response.error || anonymousResponse.error);

					toast.success(`Your ${Object.keys(changedValue)[0]} has been changed successfuly!`);
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

			changeCredentials();
		}
	}, [changedValue, dispatch]);

	return (
		<Suspense fallback={<LoaderSpinner title="credentials" />}>
			<Await resolve={credentialsLoaderData}>{loadedData => <Credentials data={loadedData} />}</Await>
		</Suspense>
	);
};

export const action = async ({ request }) => {
	const formData = await request.formData();

	return Object.fromEntries(formData);
};

const credentialsLoader = async () => {
	const uid = await getUid('accountUid');
	const { email, password } = await getProductsData(`users/validated/${uid}/credentials`);

	return { email, password };
};

export const loader = () => {
	return defer({
		credentialsLoaderData: credentialsLoader(),
	});
};
export default CredentialsPage;
