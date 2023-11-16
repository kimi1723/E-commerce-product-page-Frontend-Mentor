import { useActionData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import CheckoutSuccessful from '../../components/checkout/successful/CheckoutSuccessful';
import useSendOrder from '../../hooks/useSendOrder';
import { cartActions } from '../../store/cart-slice';

const CheckoutSuccessfulPage = () => {
	const cart = useSelector(state => state.cart);
	const { email, isSignedIn } = useSelector(state => state.authentication);
	const [orderSentSuccessfuly, setOrderSentSuccessfully] = useState(undefined);
	const orderRef = useRef(cart);
	const userData = useActionData();
	const navigate = useNavigate();
	const sendOrder = useSendOrder();
	const dispatch = useDispatch();

	const orderData = orderRef.current;

	useEffect(() => {
		const handleOrder = async () => {
			if (userData) {
				setOrderSentSuccessfully(await sendOrder({ orderData, email, isSignedIn }));
				// dispatch(userDataActions.addNewOrder(orderData));
				// dispatch(cartActions.replaceCart({ products: [], totalQuantity: 0 }));
			} else {
				navigate('/');
			}
		};

		handleOrder();
	}, []);

	console.log(orderSentSuccessfuly);

	return <CheckoutSuccessful userData={userData} orderData={orderData} orderSentSuccessfuly={orderSentSuccessfuly} />;
};

export const action = async ({ request }) => {
	const data = await request.formData();

	return data;
};

export default CheckoutSuccessfulPage;
