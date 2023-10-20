import { useNavigate } from 'react-router-dom';

import classes from './Checkout.module.css';

const Checkout = () => {
	const navigate = useNavigate();

	return (
		<nav className={classes.nav}>
			<button type="button" className={classes['go-back-btn']} onClick={() => navigate(-1)}>
				Go back
			</button>
		</nav>
	);
};

export default Checkout;
