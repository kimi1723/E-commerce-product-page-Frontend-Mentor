import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadingActions } from '../../store/loading-slice';

import classes from './LoaderSpinner.module.css';

const LoaderSpinner = ({ title = 'resources' }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadingActions.setIsLoading(true));

		return () => {
			dispatch(loadingActions.setIsLoading(false));
		};
	});

	return (
		<div className={classes.container}>
			<div className={classes['custom-loader']}></div>
			<h1 className={classes.title}>Loading {title}...</h1>
		</div>
	);
};

export default LoaderSpinner;
