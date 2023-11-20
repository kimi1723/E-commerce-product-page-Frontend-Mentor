import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import getUid from '../../../utils/getAnonymousToken';
import setFirebaseData from '../../../utils/setFirebaseData';
import { authenticationActions } from '../../../store/authentication-slice';
import { errorActions } from '../../../store/error-slice';

const SignoutBtn = ({ className: classes }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logoutHandler = async () => {
		const uid = await getUid();

		try {
			const { status } = await setFirebaseData(`/users/anonymousTokens/${uid}/isSignedIn`, { status: false });

			if (status !== 200) {
				throw new Error(`Server response code: ${status}`);
			}

			navigate('/');

			dispatch(
				authenticationActions.changeAuthenticationState({ isSignedIn: false, email: '', signedOutByLogout: true }),
			);
		} catch (error) {
			dispatch(
				errorActions.setError({
					isError: true,
					message: {
						content: 'Unable to logout',
						error: error.code || error.message,
					},
				}),
			);
		}
	};

	return (
		<button type="button" className={classes} onClick={logoutHandler}>
			Logout
		</button>
	);
};

export default SignoutBtn;
