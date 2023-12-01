import { motion } from 'framer-motion';

import classes from './Orders.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Orders = ({ ordersData }) => {
	const { isMobile } = useSelector(state => state.deviceType);
	const navigate = useNavigate();

	if (ordersData === null) {
		return <h1 className={classes.h1}>Sorry, you have made no orders yet.</h1>;
	}

	if (ordersData.error) {
		return (
			<>
				<h1 className={classes.h1}>An unexpected error has occured!</h1>
				<p className={classes['error-text']}>{ordersData.error}</p>
			</>
		);
	}

	const orders = ordersData.map(({ totalQuantity, products, timestamp, totalPrice, id }) => {
		const orderQuantityLabel = totalQuantity > 1 ? 'items' : 'item';
		const { imageUrl, alt } = products[0];
		const date = new Date(timestamp.seconds * 1000).toLocaleString();
		const btnMotionScale = 0.95;

		const navigateHandler = () => navigate(id);

		return (
			<li key={id} className={classes.li}>
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
						onClick={navigateHandler}
						className={classes.btn}>
						Order details
					</motion.button>
				</div>
			</li>
		);
	});

	return (
		<>
			<h1 className={classes.h1}>All orders</h1>
			<ul className={classes.list}>{orders}</ul>
		</>
	);
};

export default Orders;
