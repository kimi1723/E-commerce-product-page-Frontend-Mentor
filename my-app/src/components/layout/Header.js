import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from '../navigation/MainNavigation';

import classes from './Header.module.css';
import logo from '../../assets/images/logo.svg';

const Header = () => {
	const [mobileIsActive, setMobileIsActive] = useState(true);
	const showNavigationHandler = () => {
		setMobileIsActive(!mobileIsActive);
	};

	const navBtnClasses = mobileIsActive ? `${classes['nav-btn']} ${classes.active}` : `${classes['nav-btn']}`;

	return (
		<header className={classes.header}>
			<button type="button" className={navBtnClasses} aria-label="navigation menu" onClick={showNavigationHandler}>
				<span className={classes['btn-content']}></span>
			</button>
			<Link to="#" className={classes['logo-link']}>
				<img src={logo} alt="sneakers" className={classes.logo} />
			</Link>
			<MainNavigation mobileIsActive={true} />
		</header>
	);
};

export default Header;
