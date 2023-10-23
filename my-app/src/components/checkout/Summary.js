import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Savings from './Savings';
import Products from './Products';

import classes from './Summary.module.css';

const Summary = () => {
	const cart = useSelector(state => state.cart.products);
	const totalQuantity = useSelector(state => state.cart.totalQuantity);
	const discountRef = useRef(false);

	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Cart summary</h1>
				<p className={classes.art}>{totalQuantity} Art.</p>
			</header>
			<main className={classes.main}>
				<ul className={classes.list} role="list">
					{<Products cart={cart} />}
				</ul>
				{<Savings cart={cart} />}
				<form>
					<input type="text" name="discount" id="discount" placeholder="Enter discount" />
				</form>
			</main>
		</>
	);
};

export default Summary;
