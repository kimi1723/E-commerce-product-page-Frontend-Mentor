import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import DesktopNavigation from '../navigation/desktop/DesktopNavigation';
import MobileNavigation from '../navigation/mobile/MobileNavigation';
import Cart from './cart/Cart';
import Account from './account/Account';
import Logo from '../ui/Logo';
import avatarImg from '../../assets/images/image-avatar.png';
import classes from './Header.module.css';
import cartIcon from '../../assets/images/icon-cart.svg';

import CartItemsCounted from './cart/CartItemsQuantity';

let hideCartTimeout, hideAccountTimeout;

const Header = () => {
	const isMobile = useSelector(state => state.deviceType.isMobile);
	const [mobileNavIsActive, setMobileNavIsActive] = useState(false);
	const [isCartVisible, setIsCartVisible] = useState(false);
	const [isAccountVisible, setIsAccountVisible] = useState(true);

	const showMobileNavigationHandler = () => {
		setMobileNavIsActive(prev => !prev);
	};

	const hideMobileNavHandler = () => {
		setMobileNavIsActive(false);
	};

	const showCartHandler = () => {
			setIsCartVisible(true);
			clearTimeout(hideCartTimeout);
		},
		showAccountHandler = () => {
			setIsAccountVisible(true);
			clearTimeout(hideAccountTimeout);
		};

	const hideCartHandler = () => {
			hideCartTimeout = setTimeout(() => {
				setIsCartVisible(false);
			}, 100);
		},
		hideAccountHandler = () => {
			setIsAccountVisible(false);
			hideAccountTimeout = setTimeout(() => {
				setIsAccountVisible(false);
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

				<Logo additionalClasses={classes.logo} />

				{!isMobile && <DesktopNavigation />}

				<div
					className={classes['cart-container']}
					onMouseOver={showCartHandler}
					onMouseLeave={hideCartHandler}
					onFocus={showCartHandler}
					onBlur={hideCartHandler}>
					<button type="button" className={classes['cart-btn']} aria-label="cart" onClick={showCartHandler}>
						<div className={classes['cart-img-container']}>
							<img src={cartIcon} alt="cart" />
							{<CartItemsCounted />}
						</div>
					</button>
					<AnimatePresence>
						{isCartVisible && <Cart hideCart={hideCartHandler} classesProvided={classes['cart-account-container']} />}
					</AnimatePresence>
				</div>

				<div
					className={classes['account-container']}
					onMouseOver={showAccountHandler}
					onMouseLeave={hideAccountHandler}
					onFocus={showAccountHandler}
					onBlur={hideAccountHandler}>
					<button type="button" className={classes['account-btn']} aria-label="account" onClick={showAccountHandler}>
						<img src={avatarImg} alt="" className={classes['avatar-img']} />
					</button>
					<AnimatePresence>
						{isAccountVisible && (
							<Account hideAccount={hideAccountHandler} classesProvided={classes['cart-account-container']} />
						)}
					</AnimatePresence>
				</div>
			</header>
		</>
	);
};

export default Header;
