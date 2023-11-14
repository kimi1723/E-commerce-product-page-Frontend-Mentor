import { useSelector } from 'react-redux';

import setFirebaseData from '../utils/setFirebaseData';
import getUid from '../utils/getAnonymousToken';

const useSendOrder = () => {
	const sendOrder = ({ order, email, isSignedIn }) => {
		if (isSignedIn && email) {
			return setFirebaseData(`/users/emails/${email}/userOrders`, order);
		} else {
			console.log('elsee');
			return 'not signed in';
		}
	};

	return sendOrder;
};

export default useSendOrder;
