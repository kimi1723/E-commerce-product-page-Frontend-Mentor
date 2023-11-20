import { useNavigate } from 'react-router-dom';

import Products from '../../../checkout/generic/Products';

import classes from './OrderDetails.module.css';

const OrderDetails = ({ orderData: { products, discount, id } }) => {
	const navigate = useNavigate();

	const goBackBtnHandler = () => navigate('/account/orders');

	return (
		<>
			<button type="button" className={classes['go-back-btn']} onClick={goBackBtnHandler}>
				Go back
			</button>
			<h1 className={classes.h1}>Order {id}</h1>
			<Products productsData={products} discount={discount.discountType} />
		</>
	);
	// return <h1>Order {orderData}</h1>;
};

export default OrderDetails;
