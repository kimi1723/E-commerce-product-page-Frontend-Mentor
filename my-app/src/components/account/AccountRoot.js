import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ReactSelect from '../ui/ReactSelect';
import SignoutBtn from '../ui/buttons/SignoutBtn';

import classes from './AccountRoot.module.css';
import { useSelector } from 'react-redux';

const AccountRoot = ({ children }) => {
	const navigate = useNavigate();
	const email = useSelector(state => state.authentication.email);
	console.log(email);
	const { pathname } = useLocation();
	const navOptions = [
		{ label: 'My account', value: 'myaccount' },
		{ label: 'Orders', value: 'orders' },
		{ label: 'Personal information', value: 'personal-information' },
		{ label: 'Shipment details', value: 'shipment-details' },
	];

	const currentPathIndex = navOptions.findIndex(option => pathname.includes(option.value));

	useEffect(() => {
		localStorage.setItem('email', email);

		return () => {
			localStorage.removeItem('email');
		};
	}, [email]);

	const changePathHandler = e => {
		const newPath = navOptions[navOptions.indexOf(e)].value;

		navigate(`/account/${newPath}`);
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
					<SignoutBtn className={classes['signout-btn']} />
				</div>
			</main>
		</>
	);
};

export default AccountRoot;
