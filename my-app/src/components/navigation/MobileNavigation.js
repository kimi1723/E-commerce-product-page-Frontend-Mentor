import { NavLink } from 'react-router-dom';

import classes from './MobileNavigation.module.css';

const MobileNavigation = ({ mobileNavIsActive }) => {
	const navClasses = mobileNavIsActive ? `${classes['nav-active']}` : classes.nav;
	const linksIndex = mobileNavIsActive ? 0 : -1;

	return (
		<nav className={navClasses}>
			<div className={classes['hero-bg']}></div>
			<div className={classes['hero-backdrop']}></div>
			<ul role="list" className={classes['nav-list']}>
				<li>
					<NavLink to="#" className={classes['nav-link']} tabIndex={linksIndex}>
						Collections
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']} tabIndex={linksIndex}>
						Men
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']} tabIndex={linksIndex}>
						Women
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']} tabIndex={linksIndex}>
						About
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']} tabIndex={linksIndex}>
						Contact
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default MobileNavigation;
