import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

import useClearPricing from '../../hooks/useClearPricing';

import classes from './Checkout.module.css';
import { useSelector } from 'react-redux';

let initial = true;

const Checkout = ({ cartInitial }) => {
	const cartCurrentState = useSelector(state => state.cart.products);
	const navigate = useNavigate();
	const clearPricing = useClearPricing();

	const scale = 1.05;

	useEffect(() => {
		return () => {
			clearPricing();
		};
	}, []);

	useEffect(() => {
		if (!initial) return;

		if (cartInitial === null || !cartInitial.products || cartInitial.products.length < 1) {
			navigate('/');
		}
	}, [cartInitial, navigate]);

	useEffect(() => {
		if (initial) {
			initial = false;
			return;
		}

		if (cartCurrentState.length < 1) {
			navigate('/');
		}
	}, [cartCurrentState, navigate]);

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
