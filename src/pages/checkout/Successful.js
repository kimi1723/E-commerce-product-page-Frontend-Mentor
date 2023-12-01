import { useActionData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import Successful from '../../components/checkout/successful/Successful';
import useSendOrder from '../../hooks/useSendOrder';
import { cartActions } from '../../store/cart-slice';
import setFirebaseData from '../../utils/setFirebaseData';
import getUid from '../../utils/getUid';
import { toast } from 'sonner';

const CheckoutSuccessfulPage = () => {
	const cart = useSelector(state => state.cart);
	const { isSignedIn } = useSelector(state => state.authentication);
	const [orderSentSuccessfuly, setOrderSentSuccessfully] = useState(undefined);
	const [personalInformationSentSuccessfuly, setPersonalInformationSentSuccessfuly] = useState(undefined);
	const orderRef = useRef(cart);
	const userData = useActionData();
	const navigate = useNavigate();
	const sendOrder = useSendOrder();
	const dispatch = useDispatch();

	const orderData = orderRef.current;

	useEffect(() => {
		const handleOrder = async () => {
			if (userData && isSignedIn) {
				const uid = await getUid('accountUid');
				const { password, 'payment-method': paymentMethod, ...personalInformation } = Object.fromEntries(userData);

				setOrderSentSuccessfully(await sendOrder({ orderData, isSignedIn }));
				setPersonalInformationSentSuccessfuly(
					await setFirebaseData(`/users/validated/${uid}/personalInformation`, personalInformation),
				);

				toast.success('Order sent successfuly!');
				dispatch(cartActions.replaceCart({ products: [], totalQuantity: 0 }));
			} else if (userData && !isSignedIn) {
				toast.success('Order sent successfuly!');
			} else {
				navigate('/');
			}
		};

		handleOrder();
	}, []);

	return (
		<Successful
			userData={userData}
			orderData={orderData}
			orderSentSuccessfuly={orderSentSuccessfuly}
			personalInformationSentSuccessfuly={personalInformationSentSuccessfuly}
		/>
	);
};

export const action = async ({ request }) => {
	const data = await request.formData();

	return data;
};

export default CheckoutSuccessfulPage;
