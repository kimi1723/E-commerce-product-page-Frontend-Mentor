import { NavLink } from 'react-router-dom';

const navNames = ['collections', 'men', 'women', 'about', 'contact'];

const NavigationList = ({ classes: { link, list, activeLink }, linksIndex, hideNav }) => {
	const navList = (
		<ul role="list" className={list}>
			{navNames.map(name => (
				<li key={name}>
					<NavLink
						to={`/${name}`}
						className={({ isActive }) => (isActive ? `${link} ${activeLink}` : link)}
						tabIndex={linksIndex}
						onClick={hideNav}>
						{name}
					</NavLink>
				</li>
			))}
		</ul>
	);
	return navList;
};

export default NavigationList;
