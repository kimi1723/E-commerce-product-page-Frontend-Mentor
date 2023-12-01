import { useSelector } from 'react-redux';

import Savings from './savings/Savings';
import Products from '../../ui/products/Products';
import DiscountForm from './discount-form/DiscountForm';
import PricingDetails from '../../ui/pricing-details/PricingDetails';
import Redirect from '../redirect/Redirect';

import classes from './Summary.module.css';

const Summary = () => {
	const cart = useSelector(state => state.cart.products);
	const { discountType: discount } = useSelector(state => state.cart.discount);
	const totalQuantity = useSelector(state => state.cart.totalQuantity);
	const productsTotal = useSelector(state => state.cart.totalPrice);

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
