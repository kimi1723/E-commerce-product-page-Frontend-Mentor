import { useSelector } from 'react-redux';
import ImagesGallery from './ImagesGallery';
import ProductDetails from './ProductDetails';

import classes from './Product.module.css';
import cartImg from '../../assets/images/white-icon-cart.svg';
import minusIcon from '../../assets/images/icon-minus.svg';
import plusIcon from '../../assets/images/icon-plus.svg';

const Product = ({ productDetails, imagesData }) => {
	const isMobile = useSelector(state => state.deviceType.isMobile);

	return (
		<main className={classes.main}>
			<ImagesGallery urls={imagesData.urls} alts={imagesData.alts} isMobile={isMobile} />

			<section className={classes.info}>
				<ProductDetails productDetails={productDetails} />

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
