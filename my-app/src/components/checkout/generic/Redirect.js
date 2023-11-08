import { Link } from 'react-router-dom';

import classes from './Redirect.module.css';

const Redirect = ({ componentType, children, validated, ...props }) => {
	if (componentType === 'button') {
		return (
			<button {...props} className={classes.redirect}>
				{children}
			</button>
		);
	} else if (componentType === 'link') {
		return (
			<Link {...props} className={classes.redirect}>
				{children}
			</Link>
		);
	}
};

export default Redirect;
