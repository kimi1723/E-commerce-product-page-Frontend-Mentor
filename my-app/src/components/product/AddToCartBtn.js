import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

import classes from './AddToCartBtn.module.css';
import cartImg from '../../assets/images/white-icon-cart.svg';

const AddToCartBtn = ({ productData: { id, name, price, quantity, imageUrl, alt } }) => {
	const dispatch = useDispatch();

	const updateCartDataHandler = () => {
		if (quantity > 0) {
			const data = { id, name, price, quantity, imageUrl, alt };

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
