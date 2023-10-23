import { useSelector } from 'react-redux';
import { useState } from 'react';

import Savings from './Savings';
import Products from './Products';

import classes from './Summary.module.css';
import DiscountForm from './DiscountForm';

const Summary = () => {
	const cart = useSelector(state => state.cart.products);
	const totalQuantity = useSelector(state => state.cart.totalQuantity);
	const [discount, setDiscount] = useState(false);

	const discountHandler = discount => {
		setDiscount(discount);
	};

	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Cart summary</h1>
				<p className={classes.art}>{totalQuantity} Art.</p>
			</header>
			<main className={classes.main}>
				<ul className={classes.list} role="list">
					<Products cart={cart} />
				</ul>
				<Savings cart={cart} discount={discount} />
				<DiscountForm getDiscount={discountHandler} />
			</main>
		</>
	);
};

export default Summary;
