import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';

const getProductsData = async path => {
	try {
		const productsRef = ref(database, path);
		const snapshot = await get(productsRef);
		const data = snapshot.val();

		return data;
	} catch (error) {
		return { error };
	}
};

export default getProductsData;
