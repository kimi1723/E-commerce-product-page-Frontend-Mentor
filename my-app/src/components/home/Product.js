import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cacheImages from '../../utils/cacheImages';

import classes from './Product.module.css';

const Product = ({ product: { name, imagesUrls, imagesAlts, annotation, price, discount, description } }) => {
	const [imgSrc, setImgSrc] = useState(imagesUrls[0]);

	useEffect(() => {
		cacheImages(imagesUrls);
	});

	const totalPrice = (price * ((100 - discount) / 100)).toFixed(2);

	const nextImageHandler = () => {
		setImgSrc(imagesUrls[1]);
	};

	const previousImageHandler = () => {
		setImgSrc(imagesUrls[0]);
	};

	return (
		<li className={classes.li}>
			<Link
				to="/products/product-1"
				onMouseOver={nextImageHandler}
				onFocus={nextImageHandler}
				onBlur={previousImageHandler}
				onMouseLeave={previousImageHandler}>
				<img src={imgSrc} alt={imagesAlts.image1} className={classes.img} />

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
};

export default Product;
