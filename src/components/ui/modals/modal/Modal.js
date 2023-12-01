import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

import classes from './Modal.module.css';

const Modal = ({ onClick }) => {
	return (
		<>
			{createPortal(
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={classes.modal}
					onClick={onClick}></motion.div>,
				document.getElementById('modal'),
			)}
		</>
	);
};

export default Modal;
