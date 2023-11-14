import getDecimals from '../../../utils/getDecimals';

import classes from './PricingDetails.module.css';

const PricingDetails = ({ productsTotal, discount }) => {
	// const { discountType: discount } = useSelector(state => state.cart.discount);
	const shipmentPrice = discount === 'SHIPMENT' ? 0 : 5;
	const totalPrice = getDecimals(Number(productsTotal) + shipmentPrice);

	return (
		<dl className={classes.dl}>
			<div className={classes.container}>
				<dt>Products price</dt>
				<dd>${productsTotal}</dd>
			</div>
			<div className={classes.container}>
				<dt>Shipment</dt>
				<dd>${shipmentPrice}.00</dd>
			</div>
			<div className={classes.container}>
				<dt>Total price</dt>
				<dd>${totalPrice}</dd>
			</div>
		</dl>
	);
};

export default PricingDetails;
