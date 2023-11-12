import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { errorActions } from '../store/error-slice';
import setFirebaseData from '../utils/setFirebaseData';
import getUid from '../utils/getAnonymousToken';

let initial = 0;

const useSendCartData = async () => {
	const dispatch = useDispatch();
	const data = useSelector(state => state.cart);

	const { isSignedIn, email } = useSelector(state => state.authentication);

	useEffect(() => {
		const sendData = async () => {
			if (initial < 2) {
				initial++;
				return;
			}

			try {
				const uid = await getUid();

				if (isSignedIn && data) {
					setFirebaseData(`/users/emails/${email}/userCart`, data);
				} else {
					setFirebaseData(`/users/anonymousTokens/${uid}/isSignedIn`, { status: false });
					setFirebaseData(`/users/anonymousTokens/${uid}/anonymousCart`, data);
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
	}, [data, dispatch, isSignedIn, email]);
};

export default useSendCartData;
