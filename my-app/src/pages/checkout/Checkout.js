import { Outlet } from 'react-router-dom';
import Wrapper from '../../components/ui/wrappers/Wrapper';
import Checkout from '../../components/checkout/Checkout';

const CheckoutPage = () => {
	return (
		<Wrapper>
			<Checkout />
			<Outlet />
		</Wrapper>
	);
};

export default CheckoutPage;
