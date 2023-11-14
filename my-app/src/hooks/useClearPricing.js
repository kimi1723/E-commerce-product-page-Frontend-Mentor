import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';

const useClearPricing = () => {
	const dispatch = useDispatch();

	const handleClearPricing = () => {
		dispatch(cartActions.handleDiscount({ isDiscount: false, discountType: null, discountCode: '' }));

		dispatch(cartActions.handleTotalPrice(null));
	};

	return handleClearPricing;
};

export default useClearPricing;
