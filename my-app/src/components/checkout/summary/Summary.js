import { useSelector } from 'react-redux';
import { useState } from 'react';

import Savings from './Savings';
import Products from './Products';

import DiscountForm from './DiscountForm';
import PricingDetails from './PricingDetails';
import Redirect from '../generic/Redirect';

import classes from './Summary.module.css';

const Summary = () => {
	const cart = useSelector(state => state.cart.products);
	const { discountType: discount } = useSelector(state => state.cart.discount);
	const totalQuantity = useSelector(state => state.cart.totalQuantity);
	// const [discount, setDiscount] = useState(null);
	const [productsTotal, setProductsTotal] = useState(null);

	// const discountHandler = discount => {
	// 	setDiscount(discount);
	// };

	const totalPriceHandler = productsTotal => {
		setProductsTotal(productsTotal);
	};

	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Cart summary</h1>
				<p className={classes.art}>{totalQuantity} Art.</p>
			</header>
			<main className={classes.main}>
				<Products cart={cart} />

				<div className={classes.details}>
					<Savings discount={discount} cart={cart} getTotal={totalPriceHandler} />

					<DiscountForm />

					<PricingDetails productsTotal={productsTotal} discount={discount} />

					<Redirect to="details" componentType="link">
						Next
					</Redirect>
				</div>
			</main>
		</>
	);
};

export default Summary;
