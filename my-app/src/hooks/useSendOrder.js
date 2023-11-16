import { Timestamp } from 'firebase/firestore';

import setFirebaseData from '../utils/setFirebaseData';
import getUid from '../utils/getAnonymousToken';

const useSendOrder = () => {
	const sendOrder = async ({ orderData, email, isSignedIn }) => {
		if (isSignedIn && email) {
			return setFirebaseData(
				`/users/emails/${email}/userOrders`,
				{ ...orderData, timestamp: Timestamp.fromDate(new Date()) },
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
