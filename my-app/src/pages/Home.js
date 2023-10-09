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
		const imageUrl = await getImages(id, 'one');
		const newProduct = { ...data[id], imageUrl };

		products.push(newProduct);
	}

	return products;
};

export default HomePage;
