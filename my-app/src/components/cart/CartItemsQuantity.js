import { useSelector } from 'react-redux';

import classes from './CartItemsQuantity.module.css';

const CartItemsQuantity = () => {
	const cartItemsNumber = useSelector(state => state.cart.totalQuantity);

	return <p className={classes['items-counted']}>{cartItemsNumber}</p>;
};

export default CartItemsQuantity;
