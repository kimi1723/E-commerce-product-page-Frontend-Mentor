import { Link } from 'react-router-dom';
import getProductsData from '../../utils/getProductsData';
import getImages from '../../utils/getImages';
import Wrapper from '../ui/Wrapper';

import classes from './Home.module.css';

const Home = () => {
	const fun = async () => {
		const data = await getProductsData('/products');
		const arr = [];

		for (const id in data) {
			const imageUrl = await getImages(id, 'one');
			console.log(imageUrl);
			arr.push(data[id]);
		}
		// console.log(arr);
		// const imagesData = await getImages('/products', 'one');
		// console.log(imagesData);
		// console.log(data);
	};
	fun();

	const DUMMY_PRODUCTS = [
		{
			address: 'product-1',
			title: 'Fall Limited Edition Sneakers',
		},
		{ address: 'product-2', title: 'Fall Limited Edition Sneakers2' },
	];

	const products = DUMMY_PRODUCTS.map(product => (
		<Link key={Math.random()} to={`products/${product.address}`}>
			{product.title}
		</Link>
	));

	return (
		<Wrapper>
			<main className={classes.main}>
				<h1>Feel free to browse our assortment!</h1>
				{products}
			</main>
		</Wrapper>
	);
};

export default Home;
