import { get, ref } from 'firebase/database';
import { database } from '../firebaseInitialization';

const getFirebaseData = async refUrl => {
	const snapshot = await get(ref(database, refUrl));

	return snapshot.val();
};

export default getFirebaseData;
