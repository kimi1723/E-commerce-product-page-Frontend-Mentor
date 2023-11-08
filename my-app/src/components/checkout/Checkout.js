import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import classes from './Checkout.module.css';

const Checkout = () => {
	const navigate = useNavigate();
	const scale = 1.05;

	return (
		<nav className={classes.nav}>
			<motion.button
				whileHover={{ scale }}
				whileFocus={{ scale }}
				transition={{ type: 'spring', stiffness: 500 }}
				type="button"
				className={classes['go-back-btn']}
				onClick={() => navigate(-1)}>
				Go back
			</motion.button>
		</nav>
	);
};

export default Checkout;
