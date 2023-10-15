import { useSelector } from 'react-redux';

import classes from './Cart.module.css';
import deleteIcon from '../../assets/images/icon-delete.svg';

const Cart = () => {
	let content;
	const items = useSelector(state => state.cart.items);

	if (items.length > 0) {
		const mappedItems = items.map(item => {
			return (
				<li key={item.id} className={classes.item}>
					<img src={item.imageUrl} className={classes['item-img']} alt="item" />

					<h3 className={classes.name}>{item.name}</h3>
					<p className={classes.pricing}>
						{`$${item.price} x ${item.quantity} `}
						<span className={classes['total-price']}>{`$${item.price * item.quantity}`}</span>
					</p>

					<button className={classes['remove-item-btn']}>
						<img src={deleteIcon} alt="delete " />
					</button>
				</li>
			);
		});
		content = <ul className={classes.list}>{mappedItems}</ul>;
	} else {
		content = (
			<>
				<div className={classes.items}></div>
				<p className={classes.empty}>Your cart is empty.</p>
			</>
		);
	}
	return (
		<section className={classes.cart}>
			<h2 className={classes.heading}>Cart</h2>
			{content}
		</section>
	);
};

export default Cart;
