import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { cartActions } from '../../../store/cart-slice';
import getDecimals from '../../../utils/getDecimals';

import classes from './Savings.module.css';

const shipmentPrice = 5;

const Savings = ({ cart, getTotal, discount }) => {
	const dispatch = useDispatch();

	const originalTotal = cart.map(product => product.originalPrice * product.quantity).reduce((a, b) => a + b, 0);
	let discountedTotal = cart.map(product => product.discountedPrice * product.quantity).reduce((a, b) => a + b, 0);

	if (discount && discount !== 'SHIPMENT') {
		discountedTotal = getDecimals(discountedTotal - (discountedTotal * discount) / 100);
	} else if (discount && discount === 'SHIPMENT') {
		discountedTotal -= shipmentPrice;
	}

	const savings = getDecimals(originalTotal - discountedTotal);

	const savingsContent = savings > 0 ? <p className={classes.savings}>You are saving ${savings} </p> : '';

	useEffect(() => {
		getTotal(discountedTotal);
	}, [discountedTotal, getTotal]);

	return <div className={classes.div}>{savingsContent}</div>;
};

export default Savings;
