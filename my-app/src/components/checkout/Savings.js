import { useEffect, useState } from 'react';
import classes from './Savings.module.css';

const Savings = ({ cart, discount, getTotal }) => {
	const [isDiscount, setIsDiscount] = useState(discount);
	const originalTotal = cart.map(product => product.originalPrice * product.quantity).reduce((a, b) => a + b, 0);
	let discountedTotal = cart.map(product => product.discountedPrice * product.quantity).reduce((a, b) => a + b, 0);

	if (discount && discount !== 'SHIPMENT') {
		discountedTotal = (discountedTotal - (discountedTotal * discount) / 100).toFixed(2);
	}
	const savings = (originalTotal - discountedTotal).toFixed(2);

	const savingsContent = savings > 0 ? <p className={classes.savings}>You are saving ${savings} </p> : '';

	const discountProperties =
		discount === false
			? { classes: `${classes.discount} ${classes['discount-red']}`, content: 'Discount code is incorrect!' }
			: { classes: `${classes.discount} ${classes['discount-green']}`, content: 'Discount added successfully!' };

	useEffect(() => {
		getTotal(discountedTotal);
	}, [discountedTotal, getTotal]);

	useEffect(() => {
		setIsDiscount(discount);

		return () => {
			setTimeout(() => {
				// setIsDiscount(null);
			}, 3000);
		};
	}, [discount]);

	return (
		<div className={classes.div}>
			{savingsContent}
			{isDiscount !== null && <p className={discountProperties.classes}>{discountProperties.content}</p>}
			{/* {isDiscount !== null } */}
		</div>
	);
};

export default Savings;
