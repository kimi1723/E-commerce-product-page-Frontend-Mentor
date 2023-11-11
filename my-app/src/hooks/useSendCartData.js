import { useSelector, useDispatch } from 'react-redux';
import { errorActions } from '../store/error-slice';
import { useEffect } from 'react';
import getUid from '../utils/getAnonymousToken';

let i = 0;

const useSendCartData = async () => {
	const dispatch = useDispatch();
	const data = useSelector(state => state.cart);
	const { isSignedIn } = useSelector(state => state.isSignedIn);

	useEffect(() => {
		// console.log('i');
		const sendData = async () => {
			if (i < 2) {
				i++;
				return;
			}

			try {
				const uid = await getUid();

				// await set(ref(database, `/users/anonymousTokens/${uid}/anonymousCart`), data);
				// await set(ref(database, `/users/${id}`), data);
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
	}, [data, dispatch]);
};

export default useSendCartData;
