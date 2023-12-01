import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import getFirebaseData from '../../../../utils/getFirebaseData';
import { cartActions } from '../../../../store/cart-slice';
import { errorActions } from '../../../../store/error-slice';

import classes from './DiscountForm.module.css';

const DiscountForm = () => {
	const dispatch = useDispatch();
	const { discountCode } = useSelector(state => state.cart.discount);

	const discountCodeHandler = e => {
		dispatch(cartActions.handleDiscount({ discountCode: e.target.value }));
	};

	const checkDiscountHandler = async e => {
		e.preventDefault();

		if (discountCode.trim() === '') return;

		try {
			const discount = await getFirebaseData(`/promotions/discounts/${discountCode}`);

			if (discount) {
				dispatch(cartActions.handleDiscount({ isDiscount: true, discountType: discount }));
				toast.success('Discount added successfuly!');
			} else {
				dispatch(cartActions.handleDiscount({ isDiscount: false, discountType: null }));
				toast.error('Your discount code is invalid!');
			}
		} catch (error) {
			dispatch(
				errorActions.setError({
					isError: true,
					message: {
						content: `Couldn't access your discount code.`,
						error: error.code || error.message,
					},
				}),
			);
		}
	};

	return (
		<>
			<form className={classes['form']}>
				<div className={classes['input-container']}>
					<input
						type="text"
						name="discount"
						id="discount"
						className={classes['input']}
						placeholder=""
						autoComplete="off"
						value={discountCode}
						onChange={discountCodeHandler}
					/>
					<label htmlFor="discount" className={classes['label']}>
						Enter discount
					</label>
				</div>
				<button type="submit" className={classes['submit']} onClick={checkDiscountHandler}>
					Add
				</button>
			</form>
		</>
	);
};

export default DiscountForm;
