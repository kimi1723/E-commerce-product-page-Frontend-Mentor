import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { cartActions } from '../store/cart-slice';
import { errorActions } from '../store/error-slice';
import { authenticationActions } from '../store/authentication-slice';
import getUid from '../utils/getUid';
import getFirebaseData from '../utils/getFirebaseData';
import setFirebaseData from '../utils/setFirebaseData';

const useCartData = () => {
	const dispatch = useDispatch();
	const { isSignedIn } = useSelector(state => state.authentication);

	useEffect(() => {
		const fetchCartData = async () => {
			try {
				const uid = await getUid();
				const anonymousUserData = await getFirebaseData(`/users/anonymousTokens/${uid}`);

				if (!anonymousUserData) {
					const { status } = await setFirebaseData(`/users/anonymousTokens/${uid}/anonymousCart`, {
						totalQuantity: 0,
						products: [],
					});

					if (status !== 200) {
						throw new Error(`Couldn't connect to the server. Response code: ${status}`);
					}

					return;
				}

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

				if (anonymousUserData.isSignedIn && anonymousUserData.isSignedIn.status) {
					const email = anonymousUserData.credentials.email;
					const userAccountUid = await getUid('accountUid');
					const cartData = await getFirebaseData(`/users/validated/${userAccountUid}/userCart`);

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
	}, [dispatch, isSignedIn]);
};

export default useCartData;
