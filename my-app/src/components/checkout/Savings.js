import classes from './Savings.module.css';

const Savings = ({ cart }) => {
	const originalTotal = cart.map(product => product.originalPrice * product.quantity).reduce((a, b) => a + b, 0);
	const discountedTotal = cart.map(product => product.discountedPrice * product.quantity).reduce((a, b) => a + b, 0);

	const savings = (originalTotal - discountedTotal).toFixed(2);

	const savingsContent = savings > 0 ? <p className={classes.savings}>You are saving ${savings} </p> : '';

	return savingsContent;
};

export default Savings;
