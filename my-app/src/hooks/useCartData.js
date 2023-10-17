import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';
import getUid from '../auth';

const useCartData = async () => {
	const dispatch = useDispatch();

	const uid = await getUid();

	const cartRef = ref(database, `/userCarts/${uid}`);
	const snapshot = await get(cartRef);
	const cartData = snapshot.val();

	if (cartData !== null) {
		const products = [];

		for (const id in cartData.products) {
			products.push(cartData.products[id]);
		}

		dispatch(cartActions.replaceCart({ products, totalQuantity: cartData.totalQuantity }));
	}
};

export default useCartData;
