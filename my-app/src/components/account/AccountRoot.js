import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ReactSelect from '../ui/ReactSelect';
import LogoutBtn from '../ui/LogoutBtn';

import classes from './Account.module.css';
import { useSelector } from 'react-redux';

let initial = true;

const AccountRoot = ({ children }) => {
	const navigate = useNavigate();
	const email = useSelector(state => state.authentication.email);
	const { pathname } = useLocation();
	const navOptions = [
		{ label: 'My account', value: '' },
		{ label: 'Orders', value: '/orders' },
		{ label: 'Personal information', value: '/personal-information' },
		{ label: 'Shipment details', value: '/shipment-details' },
	];

	const defaultValueIndex = navOptions.findIndex(option => {
		const wantedPathname = pathname === '/account' ? '' : pathname.slice(8);
		return option.value === wantedPathname;
	});

	const [currentPathIndex, setCurrentPathIndex] = useState(defaultValueIndex);

	const path = navOptions[currentPathIndex].value;

	useEffect(() => {
		if (initial) {
			initial = false;
			return;
		}

		if (path === '') {
			navigate('/account');
		} else {
			navigate(`/account${path}`);
		}
	}, [navigate, currentPathIndex, path]);

	useEffect(() => {
		localStorage.setItem('email', email);

		return () => {
			localStorage.removeItem('email');
		};
	}, [email]);

	const changePathHandler = e => {
		setCurrentPathIndex(navOptions.indexOf(e));
	};

	return (
		<>
			<main className={classes.main}>
				<div className={classes['main-container']}>
					<header>
						<nav className={classes.nav}>
							<ReactSelect
								options={navOptions}
								value={navOptions[currentPathIndex]}
								optionStyles={{ backgroundColor: 'red' }}
								onChange={changePathHandler}
							/>
						</nav>
					</header>

					<section className={classes['content-section']}>{children}</section>
					<LogoutBtn className={classes['logout-btn']} />
				</div>
			</main>
		</>
	);
};

export default AccountRoot;
