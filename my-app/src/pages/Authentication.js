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
		navigate('/account');
	}, [data, dispatch, navigate]);

	return <Authentication />;
};

export const action = async ({ request }) => {
	const searchParams = new URL(request.url).searchParams;
	let mode = searchParams.get('mode') || 'login';

	if (mode !== 'signin' && mode !== 'signup') {
		mode = 'signup';
	}

	const data = await request.formData();
	const email = data.get('email');
	const password = data.get('password');
	const transformedEmail = email.replace('@', '').replace('.', '');
	const uid = await getUid();

	try {
		if (mode === 'signup') {
			const accountsData = (await getFirebaseData('/users/emails')) || {};

			const isAlreadyAnUser = Object.keys(accountsData).includes(transformedEmail);

			if (isAlreadyAnUser) throw new Error('There is already an account assigned to this email!');

			setFirebaseData(`/users/emails/${transformedEmail}`, { password });
			setFirebaseData(`/users/anonymousTokens/${uid}/isSignedIn`, { status: true });
			setFirebaseData(`/users/anonymousTokens/${uid}/credentials/`, { email: transformedEmail, password });
		}

		if (mode === 'signin') {
			const accountData = await getFirebaseData(`/users/emails/${transformedEmail}`);

			if (!accountData) throw new Error(`User doesn't exist! Please make an account first.`);

			const storedPassword = accountData.password;
			const isPasswordCorrect = password === storedPassword;

			if (!isPasswordCorrect) throw new Error(`Password invalid!`);

			setFirebaseData(`/users/anonymousTokens/${uid}/isSignedIn`, { status: true });
			setFirebaseData(`/users/anonymousTokens/${uid}/credentials/`, { email: transformedEmail, password });
		}

		return { isSingedIn: true, email: transformedEmail };
	} catch (error) {
		return { error, errorMessage: error.message || error };
	}
};
export default AuthenticationPage;
