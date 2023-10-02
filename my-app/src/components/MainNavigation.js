import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	return (
		<ul role="list">
			<li>
				<NavLink to="">Collections</NavLink>
			</li>
			<li>
				<NavLink to="">Men</NavLink>
			</li>
			<li>
				<NavLink to="">Women</NavLink>
			</li>
			<li>
				<NavLink to="">About</NavLink>
			</li>
			<li>
				<NavLink to="">Contact</NavLink>
			</li>
		</ul>
	);
};

export default MainNavigation;
