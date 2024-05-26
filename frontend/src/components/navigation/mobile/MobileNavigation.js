import NavigationList from '../NavigationList';

import classes from './MobileNavigation.module.css';

const MobileNavigation = ({ mobileNavIsActive, hideNav }) => {
	const navClasses = mobileNavIsActive ? `${classes['nav-active']}` : classes.nav;
	const linksIndex = mobileNavIsActive ? 0 : -1;

	const classesObj = { link: classes['nav-link'], list: classes['nav-list'] };

	return (
		<nav className={navClasses}>
			<div className={classes['hero-bg']}></div>
			<div className={classes['hero-backdrop']} onClick={hideNav}></div>
			<NavigationList classes={classesObj} linksIndex={linksIndex} hideNav={hideNav} />
		</nav>
	);
};

export default MobileNavigation;
