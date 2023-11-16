import { useSelector } from 'react-redux';

import Savings from './Savings';
import Products from '../generic/Products';
import DiscountForm from './DiscountForm';
import PricingDetails from '../generic/PricingDetails';
import Redirect from '../generic/Redirect';

import classes from './Summary.module.css';

const Summary = () => {
	const cart = useSelector(state => state.cart.products);
	const { discountType: discount } = useSelector(state => state.cart.discount);
	const totalQuantity = useSelector(state => state.cart.totalQuantity);
	const productsTotal = useSelector(state => state.cart.totalPrice);

	// console.log(productsTotal);
	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Cart summary</h1>
				<p className={classes.art}>{totalQuantity} Art.</p>
			</header>

			<main className={classes.main}>
				<Products productsData={cart} shouldQuantityUpdate={true} discount={discount} />

				<div className={classes.details}>
					<Savings discount={discount} cart={cart} />
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
