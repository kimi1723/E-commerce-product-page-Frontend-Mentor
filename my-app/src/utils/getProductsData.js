import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';

const useProducts = async path => {
	const productsRef = ref(database, path);
	const snapshot = await get(productsRef);
	const data = snapshot.val();

	return data;
};

export default useProducts;
