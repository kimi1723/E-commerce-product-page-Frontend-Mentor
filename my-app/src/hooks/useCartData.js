import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { cartActions } from '../store/cart-slice';
import { errorActions } from '../store/error-slice';
import { authenticationActions } from '../store/authentication-slice';
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

				const fetchData = cartData => {
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
				};

				if (anonymousUserData.isSignedIn.status) {
					const email = anonymousUserData.credentials.email;
					const cartData = await getFirebaseData(`/users/emails/${email}/userCart`);
					dispatch(authenticationActions.changeAuthenticationState({ isSignedIn: true, email }));

					fetchData(cartData);
				} else {
					const cartData = await getFirebaseData(`/users/anonymousTokens/${uid}/anonymousCart`);

					fetchData(cartData);
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
