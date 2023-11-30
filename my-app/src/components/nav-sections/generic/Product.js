import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import cacheImages from '../../../utils/cacheImages';
import getDecimals from '../../../utils/getDecimals';

import classes from './Product.module.css';

const Product = ({ product: { name, imagesUrls, imagesAlts, annotation, price, discount, id } }) => {
	const [imgData, setImgData] = useState({
		src: imagesUrls[0],
		alt: imagesAlts.image1,
	});

	useEffect(() => {
		cacheImages(imagesUrls);
	});

	const linkPath = `/products/${id}`;

	const isDiscount = Boolean(discount);

	const totalPrice = price * ((100 - discount) / 100);

	const nextImageHandler = () => {
		setImgData({
			src: imagesUrls[1],
			alt: imagesAlts.image2,
		});
	};

	const previousImageHandler = () => {
		setImgData({
			src: imagesUrls[0],
			alt: imagesAlts.image1,
		});
	};

	return (
		<motion.li
			variants={{
				hidden: { opacity: 0, scale: 0.5 },
				visible: { opacity: 1, scale: 1 },
			}}
			transition={{ duration: 0.5, type: 'spring', bounce: 0.25 }}
			className={classes.li}>
			<Link
				className={classes.link}
				to={linkPath}
				onMouseOver={nextImageHandler}
				onFocus={nextImageHandler}
				onBlur={previousImageHandler}
				onMouseLeave={previousImageHandler}>
				<img src={imgData.src} alt={imgData.alt} className={classes.img} />

				<section className={classes.details}>
					<p className={classes.annotation}>{annotation}</p>
					<p className={classes.name}>{name}</p>
					<p className={classes.price}>
						<span className={classes['discounted-price']}>${getDecimals(totalPrice)}</span>
						{isDiscount && (
							<>
								<span className={classes['original-price']}>${price}</span>
								<span className={classes['discount-percent']}>-{discount}%</span>
							</>
						)}
					</p>
				</section>
			</Link>
		</motion.li>
	);
};

export default Product;
