import classes from './Savings.module.css';

const Savings = ({ cart, discount }) => {
	const originalTotal = cart.map(product => product.originalPrice * product.quantity).reduce((a, b) => a + b, 0);
	const discountedTotal = cart.map(product => product.discountedPrice * product.quantity).reduce((a, b) => a + b, 0);

	let savings = (originalTotal - discountedTotal).toFixed(2);

	if (discount && discount !== 'SHIPMENT') {
		savings = savings - (savings * discount) / 100;
	}

	const savingsContent = savings > 0 ? <p className={classes.savings}>You are saving ${savings} </p> : '';

	return <div className={classes.div}>{savingsContent}</div>;
};

export default Savings;
