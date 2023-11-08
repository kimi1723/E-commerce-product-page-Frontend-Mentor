import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

import Modal from './Modal';

import classes from './ModalContent.module.css';

const ModalContent = ({ content, onClick }) => {
	return (
		<>
			{createPortal(
				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={classes.main}>
					<h2 className={classes.h2}>{content}</h2>
					<button className={classes.btn} onClick={onClick}>
						Okay
					</button>
				</motion.section>,
				document.getElementById('modal-content'),
			)}
			<Modal onClick={onClick} />
		</>
	);
};

export default ModalContent;
