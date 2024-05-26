import NavigationList from '../NavigationList';

import classes from './DesktopNavigation.module.css';

const DesktopNavigation = () => {
	const classesObj = { link: classes['nav-link'], list: classes['nav-list'], activeLink: classes['active-link'] };

	return (
		<nav className={classes.nav}>
			<NavigationList classes={classesObj} linksIndex={0} />
		</nav>
	);
};

export default DesktopNavigation;
