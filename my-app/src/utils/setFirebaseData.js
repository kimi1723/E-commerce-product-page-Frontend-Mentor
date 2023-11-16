import { set, ref, push, child } from 'firebase/database';
import { database } from '../firebaseConfig';

const setFirebaseData = async (url, data, isUnique = false) => {
	try {
		if (isUnique) {
			const key = push(child(ref(database), url)).key;
			const response = await set(ref(database, `${url}/${key}`), data);

			return { response, status: 200 };
		}

		const response = await set(ref(database, url), data);

		return { response, status: 200 };
	} catch (error) {
		return { error, status: 500 };
	}
};

export default setFirebaseData;
