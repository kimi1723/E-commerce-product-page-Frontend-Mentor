import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { errorActions } from '../store/error-slice';
import { authenticationActions } from '../store/authentication-slice';
import setFirebaseData from '../utils/setFirebaseData';
import getUid from '../utils/getAnonymousToken';

let initial = false;

const useSendCartData = async () => {
	const dispatch = useDispatch();
	const data = useSelector(state => state.cart);

	const authenticationState = useSelector(state => state.authentication);
	const { isSignedIn, email, signedOutByLogout, justSignedIn } = authenticationState;

	useEffect(() => {
		const sendData = async () => {
			if (!initial) {
				initial = true;
				return;
			}

			try {
				const uid = await getUid();

				if (isSignedIn && data) {
					if (justSignedIn) {
						dispatch(
							authenticationActions.changeAuthenticationState({
								...authenticationState,
								justSignedIn: false,
							}),
						);
						return;
					}

					const { status } = await setFirebaseData(`/users/emails/${email}/userCart`, data);

					if (status !== 200) {
						throw new Error(`Server response code: ${status}`);
					}
				} else {
					if (signedOutByLogout) {
						dispatch(
							authenticationActions.changeAuthenticationState({
								...authenticationState,
								signedOutByLogout: false,
							}),
						);
						return;
					}

					const { status } = await setFirebaseData(`/users/anonymousTokens/${uid}/anonymousCart`, data);

					if (status !== 200) {
						throw new Error(`Server response code: ${status}`);
					}
				}
			} catch (error) {
				dispatch(
					errorActions.setError({
						isError: true,
						message: {
							content: 'Unable to send cart data',
							error: error.code || error.message,
						},
					}),
				);
			}
		};

		sendData();
	}, [data, dispatch, isSignedIn]);
};

export default useSendCartData;
