import { useSelector } from 'react-redux';

import classes from './CartItemsQuantity.module.css';

const CartItemsQuantity = () => {
	const cartItemsQuantity = useSelector(state => state.cart.totalQuantity);

	return <>{cartItemsQuantity > 0 && <p className={classes['items-counted']}>{cartItemsQuantity}</p>}</>;
};

export default CartItemsQuantity;
