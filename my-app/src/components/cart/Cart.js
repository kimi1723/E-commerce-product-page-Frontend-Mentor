import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RemoveItemBtn from './RemoveItemBtn';

import classes from './Cart.module.css';

let content;

const Cart = () => {
	const products = useSelector(state => state.cart.products);

	if (products.length > 0) {
		const mappedProducts = products.map(({ price: originalPrice, quantity, id, imageUrl, name, alt }) => {
			const priceToDisplay = Number.isInteger(originalPrice) ? `${originalPrice}.00` : originalPrice;
			const totalPrice = Number.isInteger(Number(originalPrice))
				? `${originalPrice * quantity}.00`
				: (originalPrice * quantity).toFixed(2);

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

					<RemoveItemBtn id={id} />
				</li>
			);
		});
		content = (
			<>
				<ul className={classes.list} role="list">
					{mappedProducts}
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
