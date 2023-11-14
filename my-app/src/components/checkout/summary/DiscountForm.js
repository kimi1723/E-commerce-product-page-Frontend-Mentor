import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import ModalContent from '../../ui/modals/ModalContent';
import getFirebaseData from '../../../utils/getFirebaseData';
import { cartActions } from '../../../store/cart-slice';
import { errorActions } from '../../../store/error-slice';

import classes from './DiscountForm.module.css';

const DiscountForm = () => {
	const dispatch = useDispatch();
	const { discountCode } = useSelector(state => state.cart.discount);
	const [modalProperties, setModalProperties] = useState({ isVisible: false, content: '' });

	const discountCodeHandler = e => {
		dispatch(cartActions.handleDiscount({ discountCode: e.target.value }));
	};

	const checkDiscountHandler = async e => {
		e.preventDefault();

		if (discountCode.trim() === '') return;

		try {
			const discount = await getFirebaseData(`/promotions/discounts/${discountCode}`);

			if (discount) {
				setModalProperties({ isVisible: true, content: 'Discount added successfully!' });
				dispatch(cartActions.handleDiscount({ isDiscount: true, discountType: discount }));
			} else {
				setModalProperties({ isVisible: true, content: 'Discount code is incorrect!' });
				dispatch(cartActions.handleDiscount({ isDiscount: false, discountType: null }));
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

	const hideModalHandler = () => setModalProperties({ isVisible: false, content: '' });

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
			<AnimatePresence>
				{modalProperties.isVisible && <ModalContent content={modalProperties.content} onClick={hideModalHandler} />}
			</AnimatePresence>
		</>
	);
};

export default DiscountForm;
