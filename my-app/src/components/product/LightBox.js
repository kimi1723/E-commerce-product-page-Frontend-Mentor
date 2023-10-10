import { createPortal } from 'react-dom';
import Modal from '../ui/Modal';
import closeBtn from '../../assets/images/icon-close.svg';

import classes from './LightBox.module.css';

const Lightbox = ({ src, alt }) => {
	return (
		<>
			<Modal />
			{createPortal(
				<section className={classes.lightbox}>
					<img src={closeBtn} alt="" classes={classes['close-icon']} />
					<button></button>
					<img src={src} alt={alt} className={classes.img} />
					<button></button>
				</section>,
				document.getElementById('lightbox'),
			)}
		</>
	);
};

export default Lightbox;
