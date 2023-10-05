import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import classes from './Product.module.css';
import cartImg from '../../assets/images/white-icon-cart.svg';
import minusIcon from '../../assets/images/icon-minus.svg';
import plusIcon from '../../assets/images/icon-plus.svg';
import prevIcon from '../../assets/images/icon-previous.svg';
import nextIcon from '../../assets/images/icon-next.svg';

const Product = ({ productDetails, imagesData }) => {
	const isDesktop = false;
	const [actualImageIndex, setActualImageIndex] = useState(1);
	const { annotation, description, price, name, discount } = productDetails;

	const urls = imagesData.urls;
	const alts = imagesData.alts;

	const cacheImages = async urls => {
		const promises = await urls.map(url => {
			return new Promise((resolve, reject) => {
				const img = new Image();

				img.src = url;
				img.onload = resolve();
				img.onerror = reject();
			});
		});
		await Promise.all(promises);
	};

	useEffect(() => {
		cacheImages(urls);
	});

	const totalPrice = (price * ((100 - discount) / 100)).toFixed(2);

	const imageIndexHandler = whereTo => {
		setActualImageIndex(prevIndex => {
			switch (whereTo) {
				case 'previous':
					return prevIndex < 3 ? (prevIndex = 7) : (prevIndex -= 2);

				case 'next':
					return prevIndex < 7 ? (prevIndex += 2) : (prevIndex = 1);
				default:
					return console.log('error');
			}
		});
	};

	return (
		<main className={classes.main}>
			<section className={classes.gallery}>
				<button className={classes['carousel-icon']} onClick={() => imageIndexHandler('previous')}>
					<img src={prevIcon} alt="" />
				</button>
				<img src={imagesData.urls[actualImageIndex]} alt="l" className={classes['main-img']} />
				<button className={classes['carousel-icon']} onClick={() => imageIndexHandler('next')}>
					<img src={nextIcon} alt="" />
				</button>
				{isDesktop && <div className={classes['thumbnails']}></div>}
			</section>

			<section className={classes.info}>
				<h2 className={classes.annotation}>{annotation}</h2>
				<h1 className={classes.h1}>{name}</h1>
				<p className={classes.description}>{description}</p>

				<section className={classes.prices}>
					<p className={classes['discounted-price']}>
						${totalPrice}
						{Number.isInteger(totalPrice) && '.00'}
					</p>
					<p className={classes['discount-percent']}>{discount}%</p>
					<p className={classes['original-price']}>${price}</p>
				</section>

				<section className={classes['btns']}>
					<div className={classes['amount-btns']}>
						<button className={classes['reduce-amount-btn']}>
							<img src={minusIcon} alt="" />
						</button>
						<p className={classes['items-amount']}>0</p>
						<button className={classes['add-amount-btn']}>
							<img src={plusIcon} alt="" />
						</button>
					</div>

					<button className={classes['add-to-cart-btn']}>
						<img src={cartImg} alt="" className={classes['cart-icon']} />
						Add to cart
					</button>
				</section>
			</section>
		</main>
	);
};

export default Product;
