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
		const items = [];

		for (const id in cartData.items) {
			items.push(cartData.items[id]);
		}

		dispatch(cartActions.replaceCart({ items, totalQuantity: cartData.totalQuantity }));
	}
};

export default useCartData;
