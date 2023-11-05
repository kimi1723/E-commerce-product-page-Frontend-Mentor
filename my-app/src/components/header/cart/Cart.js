import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import RemoveItemBtn from './RemoveItemBtn';
import getDecimals from '../../../utils/getDecimals';

import classes from './Cart.module.css';

let content;

const Cart = ({ hideCart }) => {
	const products = useSelector(state => state.cart.products);

	if (products.length > 0) {
		const mappedProducts = products.map(({ discountedPrice, quantity, id, imageUrl, name, alt }) => {
			const priceToDisplay = getDecimals(discountedPrice);
			const totalPrice = getDecimals(discountedPrice * quantity);

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
				<Link to="/checkout" className={classes['checkout-link']} onClick={hideCart}>
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
		<motion.section
			className={classes.cart}
			initial={{ opacity: 0, y: -30, x: '-50%' }}
			animate={{ opacity: 1, y: 0, x: '-50%' }}
			exit={{ opacity: 0, y: -30, x: '-50%' }}>
			<h2 className={classes.heading}>Cart</h2>
			{content}
		</motion.section>
	);
};

export default Cart;
