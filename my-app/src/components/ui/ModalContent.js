import { createPortal } from 'react-dom';
import Modal from './Modal';

import classes from './ModalContent.module.css';

const ModalContent = ({ content, onClick }) => {
	return (
		<>
			{createPortal(
				<section className={classes.main}>
					<h2 className={classes.h2}>{content}</h2>
					<button className={classes.btn} onClick={onClick}>
						Okay
					</button>
				</section>,
				document.getElementById('modal-content'),
			)}
			<Modal onClick={onClick} />
		</>
	);
};

export default ModalContent;
