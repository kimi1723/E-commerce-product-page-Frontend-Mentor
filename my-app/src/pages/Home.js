import { useLoaderData } from 'react-router-dom';
import getProductsData from '../utils/getProductsData';
import getImages from '../utils/getImages';
import Home from '../components/home/Home';

const HomePage = () => {
	const products = useLoaderData();

	return <Home products={products} />;
};

export const loader = async () => {
	const products = [];

	const data = await getProductsData('/products');

	for (const id in data) {
		const imagesUrls = await getImages(id, 'two');

		const newProduct = { ...data[id], imagesUrls };

		products.push(newProduct);
	}

	return products;
};

export default HomePage;
