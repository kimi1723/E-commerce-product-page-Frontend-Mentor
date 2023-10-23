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
				<form className={classes['discount-form']}>
					<div className={classes['discount-input-container']}>
						<input type="text" name="discount" id="discount" className={classes['discount-input']} placeholder="" />
						<label htmlFor="discount" className={classes['discount-label']}>
							Enter discount
						</label>
					</div>
					<button type="submit" className={classes['discount-submit']}>
						Add
					</button>
				</form>
			</main>
		</>
	);
};

export default Summary;
