import { NavLink } from 'react-router-dom';

import classes from './DesktopNavigation.module.css';

const DesktopNavigation = () => {
	return (
		<nav className={classes.nav}>
			<ul role="list" className={classes['nav-list']}>
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

export default DesktopNavigation;
