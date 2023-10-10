import { createPortal } from 'react-dom';

import classes from './Modal.module.css';

const Modal = () => {
	return <>{createPortal(<div className={classes.modal}></div>, document.getElementById('modal'))}</>;
};

export default Modal;
