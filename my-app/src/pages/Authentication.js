import { redirect } from 'react-router-dom';
import { ref, get, set } from 'firebase/database';
import { database } from '../firebaseConfig';

import Authentication from '../components/authentication/Authentication';

const AuthenticationPage = () => {
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
			const accountsRef = ref(database, '/users');
			const snapshot = await get(accountsRef);
			const accountsData = snapshot.val();

			const isAlreadyAnUser = Object.keys(accountsData).includes(transformedEmail);

			const addUser = () => {
				set(ref(database, '/users/' + transformedEmail), {
					password,
				});
				return redirect('/account');
			};

			return isAlreadyAnUser
				? { error: true, errorMessage: 'There is already an account assigned to this email!' }
				: addUser();
		} catch (error) {
			return { error, errorMessage: 'An unexpected error occured!' };
		}
	}

	if (mode === 'signin') {
		try {
			const accountRef = ref(database, `/users/${transformedEmail}`);
			const snapshot = await get(accountRef);
			const accountData = snapshot.val();
			const accountPassword = accountData.password;

			return password === accountPassword ? redirect('/account') : { error: true, errorMessage: 'Password invalid!' };
		} catch (error) {
			return { error, errorMessage: `User doesn't exist! Please make an account first.` };
		}
	}
};
export default AuthenticationPage;
