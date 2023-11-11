import { get, ref } from 'firebase/database';
import { database } from '../firebaseConfig';

const getFirebaseData = async refUrl => {
	const snapshot = await get(ref(database, refUrl));

	return snapshot.val();
};

export default getFirebaseData;
