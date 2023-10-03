import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DesktopNavigation from '../navigation/DesktopNavigation';
import MobileNavigation from '../navigation/MobileNavigation';

import classes from './Header.module.css';
import logo from '../../assets/images/logo.svg';
import cartIcon from '../../assets/images/icon-cart.svg';
import avatarImg from '../../assets/images/image-avatar.png';

const Header = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768 ? true : false);
	const [mobileNavIsActive, setMobileNavIsActive] = useState(false);

	const screenSizeChangeHandler = () => {
		setIsMobile(window.innerWidth < 768 ? true : false);
	};

	const showMobileNavigationHandler = () => {
		setMobileNavIsActive(prev => !prev);
	};

	const navBtnClasses = mobileNavIsActive ? `${classes['nav-btn']} ${classes['btn-active']}` : `${classes['nav-btn']}`;

	useEffect(() => {
		window.addEventListener('resize', screenSizeChangeHandler);
	}, []);

	return (
		<header className={classes.header}>
			{isMobile && (
				<div className={classes['mobile-nav-container']}>
					<button
						type="button"
						className={navBtnClasses}
						aria-label="navigation menu"
						onClick={showMobileNavigationHandler}>
						<span className={classes['btn-content']}></span>
					</button>
					<MobileNavigation mobileNavIsActive={mobileNavIsActive} />
				</div>
			)}

			<Link to="#" className={classes['logo-link']}>
				<img src={logo} alt="sneakers" className={classes.logo} />
			</Link>

			{!isMobile && <DesktopNavigation />}

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
