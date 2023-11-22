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

		dispatch(authenticationActions.changeAuthenticationState(data));

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
		const allAccountsData = (await getFirebaseData('/users/validated')) || {};
		let userAccountUid;

		if (mode === 'signup') {
			userAccountUid = `${uid}${new Date().getTime()}`;
			const accountsEntries = Object.entries(allAccountsData);
			const existingAccountIndex = accountsEntries.findIndex(account => account[1].credentials.email === email);

			if (existingAccountIndex !== -1) throw new Error('There is already an account assigned to this email!');

			const isSignUpSetObject = {
				signUp: await setFirebaseData(`/users/validated/${userAccountUid}/credentials`, { email, password }),
				signedInStatus: await setFirebaseData(`/users/anonymousTokens/${uid}/isSignedIn`, { status: true }),
				anonymousCredentials: await setFirebaseData(`/users/anonymousTokens/${uid}/credentials/`, {
					email,
					password,
					userAccountUid,
				}),
			};

			const isSignUpSetValues = Object.values(isSignUpSetObject);

			const settingSignUpErrors = isSignUpSetValues.filter(({ status }) => status !== 200);

			if (settingSignUpErrors.length > 1) throw new Error('Something went wrong, please try again later.');
		}

		if (mode === 'signin') {
			const accountsValues = Object.values(allAccountsData);
			const foundAccountIndex = accountsValues.findIndex(account => account.credentials.email === email);

			if (foundAccountIndex === -1) throw new Error(`User doesn't exist! Please make an account first.`);

			const [userUid, { credentials: storedCredentials }] = Object.entries(allAccountsData)[foundAccountIndex];
			userAccountUid = userUid;

			if (storedCredentials.password !== password) throw new Error('Invalid password!');

			const isSignInSetObject = {
				signedInStatus: await setFirebaseData(`/users/anonymousTokens/${uid}/isSignedIn`, { status: true }),
				anonymousCredentials: await setFirebaseData(`/users/anonymousTokens/${uid}/credentials/`, {
					email,
					password,
					userAccountUid,
				}),
			};

			const isSignedInSetValues = Object.values(isSignInSetObject);

			const settingSignedInErrors = isSignedInSetValues.filter(({ status }) => status !== 200);

			if (settingSignedInErrors.length > 1) throw new Error('Something went wrong, please try again later.');
		}

		return { isSignedIn: true, email, justSignedIn: true, userAccountUid };
	} catch (error) {
		return { error, errorMessage: error.message || error };
	}
};
export default AuthenticationPage;
