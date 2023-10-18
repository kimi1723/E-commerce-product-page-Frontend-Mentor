import { set, ref } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useSelector, useDispatch } from 'react-redux';
import { errorActions } from '../store/error-slice';
import { useEffect } from 'react';
import getUid from '../auth';

let i = 0;

const useSendCartData = async () => {
	const dispatch = useDispatch();
	const data = useSelector(state => state.cart);

	useEffect(() => {
		const sendData = async () => {
			if (i < 2) {
				i++;
			} else {
				try {
					const id = await getUid();
					await set(ref(database, `/userCarts/${id}`), data);
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
			}
		};

		sendData();
	}, [data, dispatch]);
};

export default useSendCartData;
