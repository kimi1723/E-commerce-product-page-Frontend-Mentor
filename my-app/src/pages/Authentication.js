import { redirect, useActionData, useNavigate } from 'react-router-dom';
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
		if (data === undefined || data.error) {
			dispatch(authenticationActions.changeAuthenticationState(false));
			return;
		}

		navigate('/account');
		dispatch(authenticationActions.changeAuthenticationState(true));
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

	if (mode === 'signup') {
		try {
			const accountsData = await getFirebaseData('/users/emails');

			const isAlreadyAnUser = Object.keys(accountsData).includes(transformedEmail);

			if (isAlreadyAnUser) return { error: true, errorMessage: 'There is already an account assigned to this email!' };

			const uid = await getUid();

			setFirebaseData(`/users/emails/${transformedEmail}`, { password });
			setFirebaseData(`/users/emails/${transformedEmail}/userCart`, { password });
			setFirebaseData(`/users/anonymousTokens/${uid}/credentials/${transformedEmail}`, { password });

			// localStorage.setItem('isSignedIn', true);

			return { isSignedIn: true };
		} catch (error) {
			return { error, errorMessage: 'An unexpected error occured!' };
		}
	}

	if (mode === 'signin') {
		try {
			const accountData = await getFirebaseData(`/users/emails/${transformedEmail}`);
			const storedPassword = accountData.password;

			return password === storedPassword ? redirect('/account') : { error: true, errorMessage: 'Password invalid!' };
		} catch (error) {
			return { error, errorMessage: `User doesn't exist! Please make an account first.` };
		}
	}
};
export default AuthenticationPage;
