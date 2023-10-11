import { NavLink } from 'react-router-dom';

const NavigationList = ({ classes: { link, list }, linksIndex }) => {
	return (
		<ul role="list" className={list}>
			<li>
				<NavLink to="#" className={link} tabIndex={linksIndex}>
					Collections
				</NavLink>
			</li>
			<li>
				<NavLink to="#" className={link} tabIndex={linksIndex}>
					Men
				</NavLink>
			</li>
			<li>
				<NavLink to="#" className={link} tabIndex={linksIndex}>
					Women
				</NavLink>
			</li>
			<li>
				<NavLink to="#" className={link} tabIndex={linksIndex}>
					About
				</NavLink>
			</li>
			<li>
				<NavLink to="#" className={link} tabIndex={linksIndex}>
					Contact
				</NavLink>
			</li>
		</ul>
	);
};

export default NavigationList;
