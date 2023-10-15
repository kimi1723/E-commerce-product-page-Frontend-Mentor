import { useSelector } from 'react-redux';

import classes from './Cart.module.css';

const Cart = () => {
	let content;
	const items = useSelector(state => state.cart.items);

	if (items.length > 0) {
		const mappedItems = items.map(item => {
			return (
				<li key={item.id}>
					<img src="" className={classes.img} alt="item" />
					<h2 className={classes.name}>{item.name}</h2>
					<p className={classes.pricing}>
						{`$${item.price} x ${item.quantity}`}
						<span className={classes['total-price']}>{`$${item.price * item.quantity}`}</span>
					</p>
					<button className={classes['remove-item-btn']}>
						<img />
					</button>
				</li>
			);
		});
		content = mappedItems;
	} else {
		content = (
			<>
				<h2 className={classes.heading}>Cart</h2>
				<div className={classes.items}></div>
				<p className={classes.empty}>Your cart is empty.</p>
			</>
		);
	}
	return <section className={classes.cart}>{content}</section>;
};

export default Cart;
