import Products from '../../../ui/products/Products';
import PricingDetails from '../../../ui/pricing-details/PricingDetails';
import GoBackBtn from '../../../ui/buttons/go-back-btn/GoBackBtn';

import classes from './OrderDetails.module.css';

const OrderDetails = ({ orderData }) => {
	const scale = 1.05;

	if (orderData === null) {
		return (
			<h1 className={classes['error-h1']}>
				Sorry, this particular order either doesn't exist or we couldn't load it's data. Please try again later or try
				entering it from orders.
			</h1>
		);
	}

	if (orderData.error) {
		return (
			<>
				<h1 className={classes['error-h1']}>An unexpected error has occured!</h1>
				<p className={classes['error-text']}>{orderData.error}</p>
			</>
		);
	}

	const {
		products,
		discount: { discountType },
		id,
		totalPrice,
	} = orderData;

	const discountUsed = () => {
		if (typeof discountType === 'number') {
			return `additional ${discountType}%`;
		}

		return `${discountType} fee`;
	};

	return (
		<>
			<div className={classes['nav-title-container']}>
				<nav className={classes.nav}>
					<GoBackBtn whileHover={{ scale }} whileFocus={{ scale }} path="/account/orders/" />
				</nav>

				<h1 className={classes.h1}>
					Order ID: <span className={classes['order-id']}>{id}</span>
				</h1>
			</div>
			<h2 className={classes.h2}>Products ordered:</h2>
			<Products productsData={products} discount={discountType} />
			<PricingDetails productsTotal={totalPrice} discount={discountType} />{' '}
			{discountType && <p className={classes['discounted-by']}>Order has been discounted by {discountUsed()}</p>}
		</>
	);
};

export default OrderDetails;
