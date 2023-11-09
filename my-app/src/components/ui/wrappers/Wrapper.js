import classes from './Wrapper.module.css';

const Wrapper = ({ children, layoutWrapper }) => {
	const wrapperClasses = layoutWrapper ? `${classes.wrapper} ${classes.additional}` : classes.wrapper;

	return <div className={wrapperClasses}>{children}</div>;
};

export default Wrapper;
