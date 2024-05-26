import { cartActions } from '../../../../store/cart-slice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import classes from './RemoveItemBtn.module.css';
import deleteIcon from '../../../../assets/images/icon-delete.svg';

const RemoveItemBtn = ({ id }) => {
	const dispatch = useDispatch();

	const removeItemHandler = () => {
		dispatch(cartActions.removeItemFromCart({ id, quantity: 1 }));
		toast.success('Product has been removed!');
	};

	return (
		<button className={classes['remove-item-btn']} onClick={removeItemHandler}>
			<img src={deleteIcon} alt="delete " />
		</button>
	);
};

export default RemoveItemBtn;
