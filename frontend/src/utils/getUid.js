import { getAuth, signInAnonymously } from 'firebase/auth';
import getFirebaseData from './getFirebaseData';

const auth = getAuth();

const getUid = async (type = 'anonymous') => {
	try {
		const {
			user: { uid },
		} = await signInAnonymously(auth);

		if (type === 'anonymous') return uid;

		const { userAccountUid } = await getFirebaseData(`/users/anonymousTokens/${uid}/credentials`);

		return userAccountUid;
	} catch (error) {
		throw new Error(error);
	}
};

export default getUid;
