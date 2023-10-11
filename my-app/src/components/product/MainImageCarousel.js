import classes from './MainImageCarousel.module.css';
import prevIcon from '../../assets/images/icon-previous.svg';
import nextIcon from '../../assets/images/icon-next.svg';

const MainImageCarousel = ({ urls, showCarousel, carouselHandler, onClick, imgIndex, alts, showLightBox }) => {
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

	return (
		<>
			{showCarousel && (
				<button className={classes['carousel-icon']} onClick={() => liftCarouselHandler('previous')}>
					<img src={prevIcon} alt="" />
				</button>
			)}
			<img src={urls[imgIndex]} alt={imageAlt} className={classes['main-img']} onClick={liftShowLigthBoxHandler} />
			{showCarousel && (
				<button className={classes['carousel-icon']} onClick={() => liftCarouselHandler('next')}>
					<img src={nextIcon} alt="" />
				</button>
			)}
		</>
	);
};

export default MainImageCarousel;
