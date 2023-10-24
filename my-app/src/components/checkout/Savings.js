import { useEffect } from 'react';
import classes from './Savings.module.css';

const Savings = ({ cart, discount, getTotal }) => {
	const originalTotal = cart.map(product => product.originalPrice * product.quantity).reduce((a, b) => a + b, 0);
	let discountedTotal = cart.map(product => product.discountedPrice * product.quantity).reduce((a, b) => a + b, 0);

	if (discount && discount !== 'SHIPMENT') {
		discountedTotal = (discountedTotal - (discountedTotal * discount) / 100).toFixed(2);
	}

	const savings = (originalTotal - discountedTotal).toFixed(2);

	const savingsContent = savings > 0 ? <p className={classes.savings}>You are saving ${savings} </p> : '';

	useEffect(() => {
		getTotal(discountedTotal);
	}, [discountedTotal, getTotal]);

	return <div className={classes.div}>{savingsContent}</div>;
};

export default Savings;
