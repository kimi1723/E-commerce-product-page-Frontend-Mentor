import { createPortal } from 'react-dom';

import classes from './Modal.module.css';

const Modal = ({ onClick }) => {
	return <>{createPortal(<div className={classes.modal} onClick={onClick}></div>, document.getElementById('modal'))}</>;
};

export default Modal;
