import { useSelector } from 'react-redux';

import setFirebaseData from '../utils/setFirebaseData';
import getUid from '../utils/getAnonymousToken';

const useSendOrder = () => {
	const sendOrder = ({ orderData, email, isSignedIn }) => {
		if (isSignedIn && email) {
			return setFirebaseData(`/users/emails/${email}/userOrders`, orderData);
		} else {
			console.log('elsee');
			return 'not signed in';
		}
	};

	return sendOrder;
};

export default useSendOrder;
