import Products from '../../../checkout/generic/Products';
import PricingDetails from '../../../checkout/generic/PricingDetails';
import GoBackBtn from '../../../ui/buttons/GoBackBtn';

import classes from './OrderDetails.module.css';

const OrderDetails = ({
	orderData: {
		products,
		discount: { discountType },

		id,
		totalPrice,
	},
}) => {
	const scale = 1.05;

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
			<h2 className={classes.h2}>Items ordered:</h2>
			<Products productsData={products} discount={discountType} />
			<PricingDetails productsTotal={totalPrice} discount={discountType} />{' '}
			{discountType && <p className={classes['discounted-by']}>Order has been discounted by {discountUsed()}</p>}
		</>
	);
	// return <h1>Order {orderData}</h1>;
};

export default OrderDetails;
