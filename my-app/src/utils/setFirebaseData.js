import { set, ref } from 'firebase/database';
import { database } from '../firebaseConfig';

const setFirebaseData = (url, data) => {
	set(ref(database, url), data);
};

export default setFirebaseData;
