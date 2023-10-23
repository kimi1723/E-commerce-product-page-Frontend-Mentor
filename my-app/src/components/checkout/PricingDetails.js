import classes from './PricingDetails.module.css';

const PricingDetails = ({ productsTotal, discount }) => {
	const shipmentPrice = discount === 'SHIPMENT' ? 0 : 5;
	const totalPrice = Number(productsTotal) + shipmentPrice;

	return (
		<dl className={classes.dl}>
			<div className={classes.container}>
				<dt>Products price</dt>
				<dd>${productsTotal}</dd>
			</div>
			<div className={classes.container}>
				<dt>Shippment</dt>
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
