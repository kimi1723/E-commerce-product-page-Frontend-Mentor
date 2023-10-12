import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DesktopNavigation from '../navigation/DesktopNavigation';
import MobileNavigation from '../navigation/MobileNavigation';
import Cart from '../cart/Cart';

import classes from './Header.module.css';
import logo from '../../assets/images/logo.svg';
import cartIcon from '../../assets/images/icon-cart.svg';
import avatarImg from '../../assets/images/image-avatar.png';

let hideCartTimeout;

const Header = () => {
	const isMobile = useSelector(state => state.deviceType.isMobile);
	const [mobileNavIsActive, setMobileNavIsActive] = useState(false);
	const [isCartVisible, setIsCartVisible] = useState(false);

	const showMobileNavigationHandler = () => {
		setMobileNavIsActive(prev => !prev);
	};

	const hideMobileNavHandler = () => {
		setMobileNavIsActive(false);
	};

	const showCartHandler = () => {
		setIsCartVisible(true);
		clearTimeout(hideCartTimeout);
	};

	const hideCartHandler = () => {
		hideCartTimeout = setTimeout(() => {
			setIsCartVisible(false);
		}, 100);
	};

	const navBtnClasses = mobileNavIsActive ? `${classes['nav-btn']} ${classes['btn-active']}` : `${classes['nav-btn']}`;

	return (
		<>
			<div className={classes.placeholder}></div>
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
						<MobileNavigation mobileNavIsActive={mobileNavIsActive} hideNav={hideMobileNavHandler} />
					</div>
				)}

				<Link to="/" className={classes['logo-link']}>
					<img src={logo} alt="sneakers" className={classes.logo} />
				</Link>

				{!isMobile && <DesktopNavigation />}

				<button
					type="button"
					className={classes['cart-btn']}
					onMouseOver={showCartHandler}
					onMouseLeave={hideCartHandler}
					onFocus={showCartHandler}
					onBlur={hideCartHandler}>
					<img src={cartIcon} alt="cart" />
					{isCartVisible && <Cart />}
				</button>
				<button type="button" className={classes['avatar-btn']} aria-label="profile">
					<img src={avatarImg} alt="" className={classes['avatar-img']} />
				</button>
			</header>
		</>
	);
};

export default Header;
