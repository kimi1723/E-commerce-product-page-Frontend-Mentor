import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { errorActions } from '../../../../store/error-slice';

import ModalContent from '../modal-content/ModalContent';
import classes from './Error.module.css';

let content;

const Error = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector(state => state.error.message);

	if (errorMessage) {
		content = (
			<div className={classes.content}>
				{errorMessage.content}!<span className={classes.span}>{errorMessage.error}.</span>
			</div>
		);
	} else {
		content = 'An error has occured, please try again later';
	}

	const closeErrorHandler = () => {
		dispatch(
			errorActions.setError({
				isError: 'ok',
				message: '',
			}),
		);
	};

	return <ModalContent content={content} onClick={closeErrorHandler} />;
};

export default Error;
