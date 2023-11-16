import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ReactSelect from '../ui/ReactSelect';
import LogoutBtn from '../ui/LogoutBtn';

import classes from './Account.module.css';
import { useSelector } from 'react-redux';

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

	const [pathIndex, setPathIndex] = useState(defaultValueIndex);
	let pathRef = useRef(pathIndex);
	const currentPathIndex = pathRef.current;

	// const [currentPathIndex, setCurrentPathIndex] = useState(defaultValueIndex);

	const label = navOptions[currentPathIndex].label;
	console.log(pathRef);

	useEffect(() => {
		console.log('effect');
		const path = navOptions[pathRef.current].value;

		if (path === '') {
			navigate('/account');
		} else {
			navigate(`/account${path}`);
		}
	}, [navigate, pathRef]);

	useEffect(() => {
		localStorage.setItem('email', email);

		return () => {
			localStorage.removeItem('email');
		};
	}, [email]);

	const changePathHandler = e => {
		pathRef.current = navOptions.indexOf(e);
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
						{/* <h1 className={classes.h1}>{label}</h1> */}
					</header>

					<section className={classes['content-section']}>{children}</section>
					<LogoutBtn className={classes['logout-btn']} />
				</div>
			</main>
		</>
	);
};

export default AccountRoot;
