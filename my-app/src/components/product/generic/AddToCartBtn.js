import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';
import { motion } from 'framer-motion';

import classes from './AddToCartBtn.module.css';
import cartImg from '../../../assets/images/white-icon-cart.svg';

const AddToCartBtn = ({ productData: { id, annotation, discount, name, price, quantity, imageUrl, alt } }) => {
	const dispatch = useDispatch();

	const updateCartDataHandler = () => {
		if (quantity > 0) {
			const originalPrice = Number(price);
			const discountedPrice = Number((originalPrice * ((100 - discount) / 100)).toFixed(2));

			const data = { id, annotation, name, originalPrice, discountedPrice, quantity, imageUrl, alt };

			dispatch(cartActions.addProductToCart(data));
		}
	};

	return (
		<motion.button
			whileHover={{ scale: 1.025 }}
			whileFocus={{ scale: 1.025 }}
			whileTap={{ scale: 1.025 }}
			transition={{ type: 'spring', stiffness: 500 }}
			className={classes['add-to-cart-btn']}
			onClick={updateCartDataHandler}>
			<img src={cartImg} alt="" className={classes['cart-icon']} />
			Add to cart
		</motion.button>
	);
};

export default AddToCartBtn;
