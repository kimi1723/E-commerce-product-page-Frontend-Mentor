import { useState } from 'react';

import classes from './MainImageCarousel.module.css';
import prevIcon from '../../../../assets/images/icon-previous.svg';
import nextIcon from '../../../../assets/images/icon-next.svg';

const MainImageCarousel = ({ urls, showCarousel, carouselHandler, imgIndex, alts, showLightBox, isMobile }) => {
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
		document.querySelectorAll('button').forEach(btn => (btn.tabIndex = -1));
		document.querySelectorAll('a').forEach(btn => (btn.tabIndex = -1));
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
			{!isMobile && (
				<button
					aria-label="show lightbox for product images"
					type="button"
					onClick={liftShowLigthBoxHandler}
					onFocus={() => mainImgBtnActivationHandler(true)}
					onBlur={() => mainImgBtnActivationHandler(false)}
					className={mainImgBtnClasses}
					tabIndex={mainImgIndex}>
					<div className={classes['main-img-container']}>
						<img src={urls[imgIndex]} alt={imageAlt} className={classes['main-img']} />
					</div>
				</button>
			)}
			{isMobile && <img src={urls[imgIndex]} alt={imageAlt} className={classes['main-img']} />}
			{showCarousel && (
				<button className={classes['carousel-icon']} onClick={() => liftCarouselHandler('next')}>
					<img src={nextIcon} alt="" />
				</button>
			)}
		</>
	);
};

export default MainImageCarousel;
