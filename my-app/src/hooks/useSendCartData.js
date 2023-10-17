import { set, ref } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import getUid from '../auth';

let isInitial = true;

const useSendCartData = async () => {
	const data = useSelector(state => state.cart);

	useEffect(() => {
		const sendData = async () => {
			if (isInitial) {
				isInitial = false;
			} else {
				const id = await getUid();

				set(ref(database, `/userCarts/${id}`), data);
			}
		};

		sendData();
	}, [data]);
};

export default useSendCartData;
