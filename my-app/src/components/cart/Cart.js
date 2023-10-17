import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Cart.module.css';
import deleteIcon from '../../assets/images/icon-delete.svg';

let content;

const Cart = () => {
	const items = useSelector(state => state.cart.items);

	if (items.length > 0) {
		const mappedItems = items.map(({ price: originalPrice, quantity, id, imageUrl, name, alt }) => {
			const priceToDisplay = Number.isInteger(originalPrice) ? `${originalPrice}.00` : originalPrice;
			const totalPrice = Number.isInteger(Number(originalPrice))
				? `${originalPrice * quantity}.00`
				: originalPrice * quantity;

			return (
				<li key={id} className={classes.item}>
					<Link to={`/products/${id}`} className={classes.link}>
						<img src={imageUrl} className={classes['item-img']} alt={alt} />
						<h3 className={classes.name}>{name}</h3>
						<p className={classes.pricing}>
							{`$${priceToDisplay} x ${quantity} `}
							<span className={classes['total-price']}>{`$${totalPrice}`}</span>
						</p>
					</Link>

					<button className={classes['remove-item-btn']}>
						<img src={deleteIcon} alt="delete " />
					</button>
				</li>
			);
		});
		content = (
			<>
				<ul className={classes.list} role="list">
					{mappedItems}
				</ul>
				<Link to="/checkout" className={classes['checkout-link']}>
					Checkout
				</Link>
			</>
		);
	} else {
		content = (
			<>
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
