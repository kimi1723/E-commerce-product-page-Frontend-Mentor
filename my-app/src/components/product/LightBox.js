import { createPortal } from 'react-dom';
import Modal from '../ui/Modal';
import MainImageCarousel from './MainImageCarousel';
import ImagesThubmnails from './ImagesThumbnails';

import closeBtn from '../../assets/images/icon-close.svg';
import classes from './LightBox.module.css';

const Lightbox = ({ urls, carouselHandler, alts, imgIndex, setActualImageIndex }) => {
	return (
		<>
			<Modal />
			{createPortal(
				<section className={classes.lightbox}>
					<button type="button" aria-label="Close lightbox" className={classes['close-btn']}>
						<img src={closeBtn} alt="" />
					</button>
					<div className={classes['main-img']}>
						<MainImageCarousel
							urls={urls}
							showCarousel={true}
							carouselHandler={carouselHandler}
							alts={alts}
							imgIndex={imgIndex}
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
