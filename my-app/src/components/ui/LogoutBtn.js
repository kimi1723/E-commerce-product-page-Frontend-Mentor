import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import getUid from '../../utils/getAnonymousToken';
import setFirebaseData from '../../utils/setFirebaseData';
import { authenticationActions } from '../../store/authentication-slice';

const LogoutBtn = ({ className: classes }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logoutHandler = async () => {
		const uid = await getUid();

		navigate('/');
		setFirebaseData(`/users/anonymousTokens/${uid}/isSignedIn`, { status: false });

		dispatch(
			authenticationActions.changeAuthenticationState({ isSignedIn: false, email: '', signedOutByLogout: true }),
		);
	};

	return (
		<button type="button" className={classes} onClick={logoutHandler}>
			Logout
		</button>
	);
};

export default LogoutBtn;
