import { Outlet } from 'react-router-dom';
import Product from '../components/product/Product';
import Wrapper from '../components/ui/Wrapper';

const ProductPage = () => {
	return (
		<Wrapper>
			<Product />
			<Outlet />
		</Wrapper>
	);
};

export default ProductPage;
