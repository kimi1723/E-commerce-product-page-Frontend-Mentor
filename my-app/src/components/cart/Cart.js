import classes from './Cart.module.css';

const Cart = () => {
	return (
		<section className={classes.cart}>
			<h2 className={classes.heading}>Cart</h2>
			<div className={classes.items}></div>
			<p className={classes.empty}>Your cart is empty.</p>
		</section>
	);
};

export default Cart;
