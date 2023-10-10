import { createPortal } from 'react-dom';
import Modal from '../ui/Modal';
import MainImageCarousel from './MainImageCarousel';

import closeBtn from '../../assets/images/icon-close.svg';
import classes from './LightBox.module.css';

const Lightbox = ({ urls, carouselHandler, alts, imgIndex }) => {
	return (
		<>
			<Modal />
			{createPortal(
				<section className={classes.lightbox}>
					<img src={closeBtn} alt="" className={classes['close-btn']} />
					<MainImageCarousel
						urls={urls}
						showCarousel={true}
						carouselHandler={carouselHandler}
						alts={alts}
						imgIndex={imgIndex}
					/>
				</section>,
				document.getElementById('lightbox'),
			)}
		</>
	);
};

export default Lightbox;
