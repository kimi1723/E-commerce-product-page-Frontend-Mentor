import { motion, useScroll } from 'framer-motion';

import classes from './Orders.module.css';
import { useSelector } from 'react-redux';

const Orders = ({ ordersData }) => {
	const { isMobile } = useSelector(state => state.deviceType);

	const orders = ordersData.map(({ totalQuantity, products, timestamp, totalPrice }, i) => {
		const orderQuantityLabel = totalQuantity > 1 ? 'items' : 'item';
		const { imageUrl, alt } = products[0];
		const date = new Date(timestamp.seconds * 1000).toLocaleString();
		const btnMotionScale = 0.95;

		return (
			<li key={i} className={classes.li}>
				<div className={classes['label-container']}>
					<p className={classes.label}>
						{totalQuantity} {orderQuantityLabel}
					</p>
					<img src={imageUrl} alt={alt} className={classes.img} />
				</div>

				<div className={classes['date-btn-container']}>
					<p>${totalPrice}</p>
					{!isMobile && <p className={classes.date}> {date}</p>}
					<motion.button
						whileHover={{ scale: btnMotionScale }}
						whileFocus={{ scale: btnMotionScale }}
						transition={{ type: 'spring', duration: 0.3 }}
						type="button"
						className={classes.btn}>
						Order details
					</motion.button>
				</div>
			</li>
		);
	});

	return <ul className={classes.list}>{orders}</ul>;
};

export default Orders;
