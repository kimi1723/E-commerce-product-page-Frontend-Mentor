import { Link } from 'react-router-dom';

import Wrapper from '../ui/Wrapper';

import classes from './Home.module.css';

const Home = ({ products: productsData }) => {
	const products = productsData.map(product => {
		const { name, imageUrl, imagesAlts, annotation, price, discount, description } = product;
		const totalPrice = (price * ((100 - discount) / 100)).toFixed(2);

		return (
			<li key={product.name} className={classes.li}>
				<Link to="/products/product-1">
					<img src={imageUrl} alt={imagesAlts.image1} className={classes.img} />
					<section className={classes.details}>
						<p className={classes.annotation}>{annotation}</p>
						<p className={classes.name}>{name}</p>
						<p className={classes.price}>
							<span className={classes['discounted-price']}>
								${totalPrice}
								{Number.isInteger(totalPrice) && '.00'}
							</span>
							<span className={classes['original-price']}>${price}</span>
							<span className={classes['discount-percent']}>{discount}%</span>
						</p>

						<p className={classes.description}>{description}</p>
					</section>
				</Link>
			</li>
		);
	});

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
