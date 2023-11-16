import getFirebaseData from '../../../utils/getFirebaseData';
import getUid from '../../../utils/getAnonymousToken';
import { useSelector } from 'react-redux';
import Products from '../../checkout/generic/Products';

import classes from './Orders.module.css';

const Orders = ({ ordersData }) => {
	const orders = ordersData.map((order, i) => {
		const orderQuantityLabel = order.totalQuantity > 1 ? 'items' : 'item';
		const { imageUrl, alt } = order.products[0];
		const date = new Date(order.timestamp.seconds * 1000).toLocaleString();

		return (
			<li key={i} className={classes.li}>
				<div className={classes['label-container']}>
					<p className={classes.label}>
						<span className={classes.quantity}>
							{order.totalQuantity} {orderQuantityLabel}
						</span>
						<span className={classes.date}> {date}</span>
					</p>
					<img src={imageUrl} alt={alt} className={classes.img} />
				</div>

				<button type="button" className={classes.btn}>
					Show order details
				</button>
			</li>
		);
	});

	return (
		<>
			<ul>{orders}</ul>
		</>
	);
};

export default Orders;
