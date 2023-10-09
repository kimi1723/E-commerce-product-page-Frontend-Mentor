import { Link } from 'react-router-dom';

import Wrapper from '../ui/Wrapper';

import classes from './Home.module.css';

const Home = ({ products: productsData }) => {
	const products = productsData.map(product => {
		return (
			<li key={product.name} className={classes.li}>
				<img src={product.imageUrl} alt={product.imagesAlts.image1} className={classes.img} />
				<section className={classes.details}>
					<p className={classes.annotation}>{product.annotation}</p>
					<Link to="/products/product-1" className={classes.name}>
						{product.name}
					</Link>
					<p className={classes.price}>{product.price}</p>
					<span className={classes.discount}>{product.discount}%</span>
					<p className={classes.description}>{product.description}</p>
				</section>
			</li>
		);
	});

	return (
		<Wrapper>
			<main className={classes.main}>
				<h1>Feel free to browse our assortment!</h1>
				<ul className={classes.ul}>{products}</ul>
			</main>
		</Wrapper>
	);
};

export default Home;
