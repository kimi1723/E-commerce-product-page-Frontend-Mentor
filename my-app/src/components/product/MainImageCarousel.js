import { useState } from 'react';

import classes from './MainImageCarousel.module.css';
import prevIcon from '../../assets/images/icon-previous.svg';
import nextIcon from '../../assets/images/icon-next.svg';

const MainImageCarousel = ({ urls, showCarousel, carouselHandler, imgIndex, alts, showLightBox }) => {
	const [ismainImgBtnActive, setIsmainImgBtnActive] = useState(false);

	const liftCarouselHandler = whereTo => {
		carouselHandler(whereTo);
	};

	const imageAltHandler = () => {
		const altIndex = Math.round(imgIndex / 2);
		const key = `image${altIndex}`;

		return alts[key];
	};

	const imageAlt = imageAltHandler();

	const liftShowLigthBoxHandler = () => {
		showLightBox();
	};

	const mainImgBtnActivationHandler = value => {
		setIsmainImgBtnActive(value);
	};

	const mainImgBtnClasses = ismainImgBtnActive
		? `${classes['main-img-btn-active']} ${classes['main-img-btn']}`
		: classes['main-img-btn'];

	const mainImgIndex = showCarousel ? -1 : 0;

	return (
		<>
			{showCarousel && (
				<button className={classes['carousel-icon']} onClick={() => liftCarouselHandler('previous')}>
					<img src={prevIcon} alt="" />
				</button>
			)}
			<button
				aria-label="show lightbox for product images"
				type="button"
				onClick={liftShowLigthBoxHandler}
				onFocus={() => mainImgBtnActivationHandler(true)}
				onBlur={() => mainImgBtnActivationHandler(false)}
				className={mainImgBtnClasses}
				tabIndex={mainImgIndex}>
				<img src={urls[imgIndex]} alt={imageAlt} className={classes['main-img']} />
			</button>
			{showCarousel && (
				<button className={classes['carousel-icon']} onClick={() => liftCarouselHandler('next')}>
					<img src={nextIcon} alt="" />
				</button>
			)}
		</>
	);
};

export default MainImageCarousel;
