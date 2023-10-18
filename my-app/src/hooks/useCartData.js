import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { cartActions } from '../store/cart-slice';
import { errorActions } from '../store/error-slice';
import getUid from '../auth';

const useCartData = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchCartData = async () => {
			try {
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

					dispatch(
						errorActions.setError({
							isError: false,
							message: '',
						}),
					);
				}

				return false;
			} catch (error) {
				dispatch(
					errorActions.setError({
						isError: true,
						message: {
							content: 'Unable to load cart data',
							error: error.message,
						},
					}),
				);
			}
		};

		fetchCartData();
	}, [dispatch]);
};

export default useCartData;
