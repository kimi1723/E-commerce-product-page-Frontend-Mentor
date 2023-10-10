import Product from './Product';

import Wrapper from '../ui/Wrapper';

import classes from './Home.module.css';

const Home = ({ products: productsData }) => {
	const products = productsData.map(product => <Product key={product.name} product={product} />);

	return (
		<Wrapper>
			<main className={classes.main}>
				<h1 className={classes.h1}>sneakers</h1>
				<ul className={classes.ul}>{products}</ul>
			</main>
		</Wrapper>
	);
};

export default Home;
