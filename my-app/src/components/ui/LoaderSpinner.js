import classes from './LoaderSpinner.module.css';

const LoaderSpinner = ({ title }) => {
	return (
		<div className={classes.container}>
			<div className={classes['custom-loader']}></div>
			<h1 className={classes.title}>Loading {title}...</h1>
		</div>
	);
};

export default LoaderSpinner;
