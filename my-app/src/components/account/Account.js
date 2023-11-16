import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ReactSelect from '../ui/ReactSelect';
import LogoutBtn from '../ui/LogoutBtn';

import classes from './Account.module.css';
import { useSelector } from 'react-redux';

const Account = ({ children }) => {
	const navigate = useNavigate();
	const [currentPathIndex, setCurrentPathIndex] = useState(0);
	const email = useSelector(state => state.authentication.email);

	const navOptions = [
		{ label: 'My account', value: '' },
		{ label: 'Orders', value: 'orders' },
		{ label: 'Personal information', value: 'personal-information' },
		{ label: 'Shipment details', value: 'shipment-details' },
	];

	const path = navOptions[currentPathIndex].value;
	const label = navOptions[currentPathIndex].label;

	useEffect(() => {
		if (path === '') {
			navigate('/account');
		} else {
			navigate(`/account/${path}`);
		}
	}, [path, navigate]);

	useEffect(() => {
		localStorage.setItem('email', email);

		return () => {
			localStorage.removeItem('email');
		};
	}, [email]);

	const changePathHandler = e => setCurrentPathIndex(navOptions.indexOf(e));

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

					<section className={classes['content-section']}>
						Welcome back, {`user! :)`}
						{children}
					</section>
					<LogoutBtn className={classes['logout-btn']} />
				</div>
			</main>
		</>
	);
};

export default Account;
