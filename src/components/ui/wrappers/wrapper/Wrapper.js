import { useSelector } from 'react-redux';
import classes from './Wrapper.module.css';

const Wrapper = ({ children, layoutWrapper }) => {
	const { isLoading } = useSelector(state => state.loading);
	const wrapperClasses = layoutWrapper && !isLoading ? `${classes.wrapper} ${classes.additional}` : classes.wrapper;

	return <div className={wrapperClasses}>{children}</div>;
};

export default Wrapper;
