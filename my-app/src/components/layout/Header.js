import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from '../navigation/MainNavigation';

import classes from './Header.module.css';
import logo from '../../assets/images/logo.svg';
import cartIcon from '../../assets/images/icon-cart.svg';
import avatarImg from '../../assets/images/image-avatar.png';

const Header = () => {
	const [mobileIsActive, setMobileIsActive] = useState(true);

	const showNavigationHandler = () => {
		setMobileIsActive(prev => !prev);
	};

	const navBtnClasses = mobileIsActive ? `${classes['nav-btn']} ${classes['btn-active']}` : `${classes['nav-btn']}`;

	return (
		<header className={classes.header}>
			{/* {mobileIsActive && <div className={classes['nav-backdrop']}></div>} */}
			<div className={classes['nav-container']}>
				<button type="button" className={navBtnClasses} aria-label="navigation menu" onClick={showNavigationHandler}>
					<span className={classes['btn-content']}></span>
				</button>
				<MainNavigation mobileIsActive={mobileIsActive} />
			</div>

			<Link to="#" className={classes['logo-link']}>
				<img src={logo} alt="sneakers" className={classes.logo} />
			</Link>

			<button type="button" className={classes['cart-btn']}>
				<img src={cartIcon} alt="cart" />
			</button>
			<button type="button" className={classes['avatar-btn']}>
				<img src={avatarImg} alt="" className={classes['avatar-img']} />
			</button>
		</header>
	);
};

export default Header;
