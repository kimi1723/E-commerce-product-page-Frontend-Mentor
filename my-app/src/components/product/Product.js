import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImagesGallery from './ImagesGallery';

import classes from './Product.module.css';
import cartImg from '../../assets/images/white-icon-cart.svg';
import minusIcon from '../../assets/images/icon-minus.svg';
import plusIcon from '../../assets/images/icon-plus.svg';


const Product = ({ productDetails, imagesData }) => {
	const isDesktop = false;

	const { annotation, description, price, name, discount } = productDetails;

	const totalPrice = (price * ((100 - discount) / 100)).toFixed(2);

	return (
		<main className={classes.main}>
			<ImagesGallery urls={imagesData.urls} alts={imagesData.alts} />

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
