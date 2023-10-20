import { useSelector } from 'react-redux';

import classes from './Summary.module.css';

const Summary = () => {
	const cart = useSelector(state => state.cart.products);
	const products = cart.map(product => {
		const { id, imageUrl, alt, name, price } = product;

		return (
			<li key={id}>
				<img src={imageUrl} alt={alt} />

				<section>
					<h2>{name}</h2>
					<p>{price}</p>
				</section>
			</li>
		);
	});

	return (
		<main className={classes.main}>
			<h1 className={classes.h1}>Summary</h1>
			<ul>{products}</ul>
		</main>
	);
};

export default Summary;
