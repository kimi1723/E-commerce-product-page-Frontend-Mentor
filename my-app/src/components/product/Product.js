import { useState } from 'react';
import { useSelector } from 'react-redux';
import ImagesGallery from './ImagesGallery';
import ProductDetails from './ProductDetails';
import AddToCartBtn from './AddToCartBtn';
import PageContent from '../ui/PageContent';

import classes from './Product.module.css';
import minusIcon from '../../assets/images/icon-minus.svg';
import plusIcon from '../../assets/images/icon-plus.svg';

const Product = ({ productDetails, imagesData }) => {
	const isMobile = useSelector(state => state.deviceType.isMobile);
	const [itemQuantity, setItemQuantity] = useState(0);

	if (productDetails.error) {
		return (
			<PageContent title="An error has occured!">
				<p className={classes.error}>{productDetails.error.code || productDetails.error.message}</p>
			</PageContent>
		);
	} else {
		const itemCounterHandler = action => {
			setItemQuantity(prevCounter => {
				if (action === 'add') {
					return (prevCounter += 1);
				} else if (action === 'remove' && prevCounter > 0) {
					return (prevCounter -= 1);
				} else {
					return prevCounter;
				}
			});
		};

		return (
			<main className={classes.main}>
				<ImagesGallery urls={imagesData.urls} alts={imagesData.alts} isMobile={isMobile} />

				<section className={classes.info}>
					<ProductDetails productDetails={productDetails} />

					<section className={classes['btns']}>
						<div className={classes['amount-btns']}>
							<button className={classes['reduce-amount-btn']} onClick={() => itemCounterHandler('remove')}>
								<img src={minusIcon} alt="" />
							</button>
							<p className={classes['items-amount']}>{itemQuantity}</p>
							<button className={classes['add-amount-btn']} onClick={() => itemCounterHandler('add')}>
								<img src={plusIcon} alt="" />
							</button>
						</div>

						<AddToCartBtn
							productData={{
								id: productDetails.id,
								name: productDetails.name,
								price: (productDetails.price * ((100 - productDetails.discount) / 100)).toFixed(2),
								quantity: itemQuantity,
								imageUrl: imagesData.urls[1],
								alt: imagesData.alts.image1,
							}}
						/>
					</section>
				</section>
			</main>
		);
	}
};

export default Product;
