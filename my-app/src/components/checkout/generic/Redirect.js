import { Link } from 'react-router-dom';

import classes from './Redirect.module.css';

const Redirect = ({ componentType, children, ...props }) => {
	if (componentType === 'button') {
		return (
			<button {...props} className={classes.link}>
				{children}
			</button>
		);
	} else if (componentType === 'link') {
		return (
			<Link {...props} className={classes.link}>
				{children}
			</Link>
		);
	}
};

export default Redirect;
