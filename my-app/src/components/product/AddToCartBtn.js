import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

import classes from './AddToCartBtn.module.css';
import cartImg from '../../assets/images/white-icon-cart.svg';

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
		<button className={classes['add-to-cart-btn']} onClick={updateCartDataHandler}>
			<img src={cartImg} alt="" className={classes['cart-icon']} />
			Add to cart
		</button>
	);
};

export default AddToCartBtn;
