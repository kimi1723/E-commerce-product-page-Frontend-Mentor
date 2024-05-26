import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';

import classes from './Logo.module.css';

const Logo = ({ additionalClasses }) => {
	return (
		<Link to="/" className={`${classes['logo-link']} ${additionalClasses}`}>
			<img src={logo} alt="sneakers" className={classes.logo} />
		</Link>
	);
};

export default Logo;
