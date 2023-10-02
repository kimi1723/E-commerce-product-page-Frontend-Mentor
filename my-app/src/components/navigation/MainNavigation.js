import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = ({ mobileIsActive }) => {
	console.log(mobileIsActive);

	const listClasses = mobileIsActive ? `${classes['nav-list']} ${classes.active}` : `${classes['nav-list']}`;
	const heroBgClasses = mobileIsActive ? `${classes['hero-bg']} ${classes['hero-bg-active']}` : `${classes['hero-bg']}`;

	return (
		<nav>
			<div className={heroBgClasses}></div>
			<ul role="list" className={listClasses}>
				<li>
					<NavLink to="#" className={classes['nav-link']}>
						Collections
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']}>
						Men
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']}>
						Women
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']}>
						About
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className={classes['nav-link']}>
						Contact
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default MainNavigation;
