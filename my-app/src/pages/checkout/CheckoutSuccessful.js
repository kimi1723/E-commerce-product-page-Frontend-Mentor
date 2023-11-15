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
	const orderData = orderRef.current;

	const sendOrder = useSendOrder();
	const userData = useActionData();

	useEffect(() => {
		const handleOrder = async () => {
			if (userData) {
				setOrderSentSuccessfully(await sendOrder({ orderData, email, isSignedIn }));
				// dispatch(userDataActions.addNewOrder(order));
				// dispatch(cartActions.replaceCart({ products: [], totalQuantity: 0 }));
			}
		};

		handleOrder();
	}, []);

	return <CheckoutSuccessful userData={userData} orderData={orderData} orderSentSuccessfuly={orderSentSuccessfuly} />;
};

export const action = async ({ request }) => {
	const data = await request.formData();
	console.log(data);

	return data;
};

export default CheckoutSuccessfulPage;
