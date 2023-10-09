import { useLoaderData } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import getProductsData from '../utils/getProductsData';
import getImages from '../utils/getImages';

import Product from '../components/product/Product';
import Wrapper from '../components/ui/Wrapper';

const ProductPage = () => {
	const { productDetails, imagesData } = useLoaderData();

	return (
		<Wrapper>
			<Product productDetails={productDetails} imagesData={imagesData} />
			<Outlet />
		</Wrapper>
	);
};

export const loader = async ({ params }) => {
	const id = params.id;
	const productData = await getProductsData(`/products/${id}`);
	const imagesUrls = await getImages(id, 'all');

	const { imagesAlts, ...productDetails } = productData;

	const imagesData = {
		urls: imagesUrls,
		alts: imagesAlts,
	};

	return { productDetails, imagesData };
};

export default ProductPage;
