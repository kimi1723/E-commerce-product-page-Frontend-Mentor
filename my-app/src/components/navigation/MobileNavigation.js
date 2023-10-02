import { NavLink } from 'react-router-dom';

import classes from './MobileNavigation.module.css';

const MobileNavigation = ({ mobileIsActive }) => {
	const listClasses = mobileIsActive
		? `${classes['nav-list']} ${classes['nav-list-active']}`
		: `${classes['nav-list']}`;
	const heroBgClasses = mobileIsActive ? `${classes['hero-bg']} ${classes['hero-bg-active']}` : `${classes['hero-bg']}`;
	const heroBackdropClasses = mobileIsActive
		? `${classes['hero-backdrop']} ${classes['hero-backdrop-active']}`
		: `${classes['hero-backdrop']}`;

	return (
		<nav>
			<div className={heroBgClasses}></div>
			<div className={heroBackdropClasses}></div>
			<ul role="list" className={listClasses}>
				<li>
					<NavLink to="#" className={classes['nav-link']} tabIndex={mobileIsActive ? 0 : -1}>
						Collections
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']} tabIndex={mobileIsActive ? 0 : -1}>
						Men
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']} tabIndex={mobileIsActive ? 0 : -1}>
						Women
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']} tabIndex={mobileIsActive ? 0 : -1}>
						About
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']} tabIndex={mobileIsActive ? 0 : -1}>
						Contact
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default MobileNavigation;
