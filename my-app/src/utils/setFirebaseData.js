import { set, ref } from 'firebase/database';
import { database } from '../firebaseConfig';

const setFirebaseData = async (url, data) => {
	try {
		const response = await set(ref(database, url), data);

		return { response, status: 200 };
	} catch (error) {
		return { error, status: 500 };
	}
};

export default setFirebaseData;
