import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import classes from './CartItemsQuantity.module.css';

const CartItemsQuantity = () => {
	const cartItemsQuantity = useSelector(state => state.cart.totalQuantity);

	return (
		<AnimatePresence>
			{cartItemsQuantity > 0 && (
				<motion.p
					initial={{ opacity: 0, y: '-10%', x: 0 }}
					animate={{ opacity: 1, y: '-50%', x: '25%' }}
					exit={{ opacity: 0 }}
					className={classes['items-counted']}>
					{cartItemsQuantity}
				</motion.p>
			)}
		</AnimatePresence>
	);
};

export default CartItemsQuantity;
