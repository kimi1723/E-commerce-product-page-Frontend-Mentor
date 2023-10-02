import { Outlet } from 'react-router-dom';

const ProductPage = () => {
	return (
		<>
			<h1>product</h1>
			<Outlet />
		</>
	);
};

export default ProductPage;
