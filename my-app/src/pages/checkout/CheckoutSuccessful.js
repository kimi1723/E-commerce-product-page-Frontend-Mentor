import { useActionData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import CheckoutSuccessful from '../../components/checkout/successful/CheckoutSuccessful';
import useSendOrder from '../../hooks/useSendOrder';

const CheckoutSuccessfulPage = () => {
	const cart = useSelector(state => state.cart);
	const { email, isSignedIn } = useSelector(state => state.authentication);
	const [orderSentSuccessfuly, setOrderSentSuccessfully] = useState(undefined);
	const orderRef = useRef(cart);
	const order = orderRef.current;

	const sendOrder = useSendOrder();
	const userData = useActionData();

	useEffect(() => {
		const handleOrder = async () => {
			if (userData) {
				console.log(userData);
				setOrderSentSuccessfully(await sendOrder({ order, email, isSignedIn }));
				// dispatch(userDataActions.addNewOrder(order));
				// dispatch(cartActions.replaceCart({ products: [], totalQuantity: 0 }));
			}
		};

		handleOrder();
	}, []);

	return <CheckoutSuccessful userData={userData} order={order} orderSentSuccessfuly={orderSentSuccessfuly} />;
};

export const action = async ({ request }) => {
	const data = await request.formData();
	console.log(data);

	return data;
};

export default CheckoutSuccessfulPage;
