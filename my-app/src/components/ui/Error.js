import { useSelector } from 'react-redux';

import classes from './Error.module.css';

let content;

const Error = () => {
	const errorMessage = useSelector(state => state.error.message);

	if (errorMessage) {
		content = errorMessage;
	} else {
		content = <p>An error has occured, please try again later</p>;
	}

	return <>{content}</>;
};

export default Error;
