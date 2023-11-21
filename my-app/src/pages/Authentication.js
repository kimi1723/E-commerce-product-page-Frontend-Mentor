import { useActionData, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import getFirebaseData from '../utils/getFirebaseData';
import setFirebaseData from '../utils/setFirebaseData';
import Authentication from '../components/authentication/Authentication';
import getUid from '../utils/getAnonymousToken';
import { authenticationActions } from '../store/authentication-slice';

const AuthenticationPage = () => {
	const data = useActionData();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (data === undefined || data.error) return;

		dispatch(
			authenticationActions.changeAuthenticationState({ isSignedIn: true, email: data.email, justSignedIn: true }),
		);

		navigate('/account/myaccount');
	}, [data, dispatch, navigate]);

	return <Authentication />;
};

export const action = async ({ request }) => {
	const searchParams = new URL(request.url).searchParams;
	let mode = searchParams.get('mode') || 'signin';

	if (mode !== 'signin' && mode !== 'signup') {
		mode = 'signup';
	}

	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');
	const uid = await getUid();

	try {
		if (mode === 'signup') {
			const userAccountUid = `${uid}${new Date().getTime()}`;
			const accountsData = (await getFirebaseData('/users/validated')) || {};
			const accountsEntries = Object.entries(accountsData);
			const existingAccountIndex = accountsEntries.findIndex(account => account[1].credentials.email === email);

			if (existingAccountIndex !== -1) throw new Error('There is already an account assigned to this email!');

			const isDataSet = {
				signUp: await setFirebaseData(`/users/validated/${userAccountUid}/credentials`, { email, password }),
				signedInStatus: await setFirebaseData(`/users/anonymousTokens/${uid}/isSignedIn`, { status: true }),
				anonymousCredentials: await setFirebaseData(`/users/anonymousTokens/${uid}/credentials/`, {
					email,
					password,
				}),
			};

			const isDataSetValues = Object.values(isDataSet);

			for (const request in isDataSetValues) {
				const { status } = isDataSetValues[request];

				if (status !== 200) {
					throw new Error('Something went wrong, please try again later.');
				}
			}
		}

		if (mode === 'signin') {
			let accountData = await getFirebaseData(`/users/validated/${uid}/credentials/`);

			if (!accountData) {
				console.log('run fun');
				const allAccounts = await getFirebaseData(`/users/validated`);
				const accountsValues = Object.values(allAccounts);

				const foundAccountIndex = accountsValues.findIndex(account => account.credentials.email === email);
				console.log(foundAccountIndex);
				const foundAccountData = Object.entries(allAccounts)[foundAccountIndex][1];
				const isNewAccountDataSet = await setFirebaseData(`/users/validated/${uid}`, foundAccountData);
				// const isOldAccountDeleted = await setFirebaseData(`/users/validated`)
				console.log(await getFirebaseData(`/users/validated`));

				if (isNewAccountDataSet === 500) throw new Error('Unexpected error occured!');

				accountData = foundAccountData.credentials;
			}

			throw new Error(`User doesn't exist! Please make an account firstttt.`);
			if (!accountData) throw new Error(`User doesn't exist! Please make an account first.`);

			const storedPassword = await accountData.password;
			const isPasswordCorrect = password === storedPassword;

			if (!isPasswordCorrect) throw new Error(`Password invalid!`);

			const isDataSet = {
				signedInStatus: await setFirebaseData(`/users/anonymousTokens/${uid}/isSignedIn`, { status: true }),
				anonymousCredentials: await setFirebaseData(`/users/anonymousTokens/${uid}/credentials/`, {
					email: email,
					password,
				}),
			};

			const isDataSetValues = Object.values(isDataSet);

			for (const request in isDataSetValues) {
				const { status } = isDataSetValues[request];

				if (status !== 200) {
					throw new Error('Something went wrong, please try again later.');
				}
			}
		}

		return { isSingedIn: true, email: email };
	} catch (error) {
		return { error, errorMessage: error.message || error };
	}
};
export default AuthenticationPage;
