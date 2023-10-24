import { createPortal } from 'react-dom';
import Modal from '../../../ui/modals/Modal';
import MainImageCarousel from '../carousel/MainImageCarousel';
import ImagesThubmnails from '../thumbnails/ImagesThumbnails';

import closeBtn from '../../../../assets/images/icon-close.svg';
import classes from './LightBox.module.css';

const Lightbox = ({ urls, carouselHandler, alts, imgIndex, setActualImageIndex, hideLightBox }) => {
	const liftHideLightBoxHandler = () => {
		document.querySelectorAll('button').forEach(btn => (btn.tabIndex = 0));
		document.querySelectorAll('a').forEach(btn => (btn.tabIndex = 0));
		hideLightBox();
	};

	return (
		<>
			<Modal onClick={liftHideLightBoxHandler} />
			{createPortal(
				<section className={classes.lightbox}>
					<button
						type="button"
						aria-label="Close lightbox"
						className={classes['close-btn']}
						onClick={liftHideLightBoxHandler}>
						<img src={closeBtn} alt="" />
					</button>
					<div className={classes['main-img']}>
						<MainImageCarousel
							urls={urls}
							showCarousel={true}
							carouselHandler={carouselHandler}
							alts={alts}
							imgIndex={imgIndex}
							showLightBox={() => {}}
						/>
					</div>
					<ImagesThubmnails urls={urls} alts={alts} setActualImageIndex={setActualImageIndex} imgIndex={imgIndex} />
				</section>,
				document.getElementById('lightbox'),
			)}
		</>
	);
};

export default Lightbox;
