import { getAuth, signInAnonymously } from 'firebase/auth';
import getFirebaseData from './getFirebaseData';

const auth = getAuth();

const getUid = async (getAccountUid = false) => {
	try {
		const {
			user: { uid },
		} = await signInAnonymously(auth);

		if (!getAccountUid) return uid;

		const { userAccountUid } = await getFirebaseData(`/users/anonymousTokens/${uid}/credentials`);

		return userAccountUid;
	} catch (error) {
		console.log('error auth');
	}
};

export default getUid;
