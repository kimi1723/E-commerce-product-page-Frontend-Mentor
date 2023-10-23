import { useDispatch } from 'react-redux';
import { errorActions } from '../../store/error-slice';
import { useRef, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../firebaseConfig';
import ModalContent from '../ui/ModalContent';

import classes from './DiscountForm.module.css';

const DiscountForm = ({ getDiscount }) => {
	const discountRef = useRef(false);
	const dispatch = useDispatch();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const checkDiscountHandler = async e => {
		e.preventDefault();
		const discountCode = discountRef.current.value;

		if (discountCode.trim() !== '') {
			try {
				const discountRef = ref(database, `/promotions/discounts/${discountCode}`);
				const snapshot = await get(discountRef);
				const discount = snapshot.val();

				if (discount) {
					getDiscount(discount);
					setIsModalVisible(true);
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
		}
	};

	const hideModalHandler = () => setIsModalVisible(false);

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
						ref={discountRef}
						autoComplete="off"
					/>
					<label htmlFor="discount" className={classes['label']}>
						Enter discount
					</label>
				</div>
				<button type="submit" className={classes['submit']} onClick={checkDiscountHandler}>
					Add
				</button>
			</form>
			{isModalVisible && <ModalContent content={'Discount added successfully!'} onClick={hideModalHandler} />}
		</>
	);
};

export default DiscountForm;
