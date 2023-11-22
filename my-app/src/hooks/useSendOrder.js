import { ref, push, child } from 'firebase/database';
import { Timestamp } from 'firebase/firestore';
import { database } from '../firebaseConfig';

import setFirebaseData from '../utils/setFirebaseData';
import getUid from '../utils/getUid';

const useSendOrder = () => {
	const sendOrder = async ({ orderData, isSignedIn }) => {
		if (isSignedIn) {
			const userAccountUid = await getUid('accountUid');
			const url = `/users/validated/${userAccountUid}/userOrders`;
			const key = push(child(ref(database), url)).key;

			return setFirebaseData(
				`/users/validated/${userAccountUid}/userOrders/${key}`,
				{ ...orderData, timestamp: Timestamp.fromDate(new Date()), id: key },
				true,
			);
		} else {
			const uid = await getUid();

			return setFirebaseData(`users/anonymousTokens/${uid}/anonymousOrders`, orderData, true);
		}
	};

	return sendOrder;
};

export default useSendOrder;
