import { Await, Outlet, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import Checkout from '../../components/checkout/Checkout';
import Wrapper from '../../components/ui/wrappers/Wrapper';
import getUid from '../../utils/getAnonymousToken';
import getFirebaseData from '../../utils/getFirebaseData';
import LoaderSpinner from '../../components/ui/LoaderSpinner';

const CheckoutPage = () => {
	const { cart } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="checkout" />}>
			<Await resolve={cart}>
				{cart => {
					return (
						<Wrapper>
							<Checkout cartInitial={cart} />
							<Outlet />
						</Wrapper>
					);
				}}
			</Await>
		</Suspense>
	);
};

const checkoutLoader = async () => {
	const uid = await getUid();
	const anonymousUserData = await getFirebaseData(`/users/anonymousTokens/${uid}`);

	if (anonymousUserData.isSignedIn && anonymousUserData.isSignedIn.status) {
		const email = anonymousUserData.credentials.email;
		const cartData = await getFirebaseData(`/users/emails/${email}/userCart`);

		return cartData;
	} else {
		const cartData = await getFirebaseData(`/users/anonymousTokens/${uid}/anonymousCart`);

		return cartData;
	}
};

export const loader = () => {
	return defer({
		cart: checkoutLoader(),
	});
};

export default CheckoutPage;
