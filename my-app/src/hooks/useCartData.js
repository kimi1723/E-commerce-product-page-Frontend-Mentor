import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { cartActions } from '../store/cart-slice';
import { errorActions } from '../store/error-slice';
import getUid from '../utils/getAnonymousToken';
import getFirebaseData from '../utils/getFirebaseData';

const useCartData = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchCartData = async () => {
			try {
				const uid = await getUid();
				const anonymousUserData = await getFirebaseData(`/users/anonymousTokens/${uid}`);

				if (!anonymousUserData) return;

				if (anonymousUserData.isSignedIn) {
					// sign in, download signedIn cart data
				} else {
					const cartData = await getFirebaseData(`/users/anonymousTokens/${uid}/anonymousCart`);

					if (cartData === null) return;

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
