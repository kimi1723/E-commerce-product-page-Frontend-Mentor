import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ReactSelect from '../ui/ReactSelect';
import LogoutBtn from '../ui/LogoutBtn';

import classes from './Account.module.css';

const Account = ({ children }) => {
	const navigate = useNavigate();
	const [currentPathIndex, setCurrentPathIndex] = useState(0);

	const navOptions = [
		{ label: 'My account', value: '' },
		{ label: 'Orders', value: 'orders' },
		{ label: 'Personal information', value: 'personal-information' },
		{ label: 'Shipment details', value: 'shipment-details' },
	];

	const path = navOptions[currentPathIndex].value;

	useEffect(() => {
		if (path === '') {
			navigate('/account');
		} else {
			navigate(`/account/${path}`);
		}
	}, [path, navigate]);

	const changePathHandler = e => setCurrentPathIndex(navOptions.indexOf(e));

	return (
		<>
			<main className={classes.main}>
				<div className={classes['main-container']}>
					<h1 className={classes.h1}>Account settings</h1>
					<div className={classes['sections-container']}>
						<nav className={classes.nav}>
							<ReactSelect
								options={navOptions}
								value={navOptions[currentPathIndex]}
								optionStyles={{ backgroundColor: 'red' }}
								onChange={changePathHandler}
							/>
						</nav>
					</div>
					<section className={classes['content-section']}>
						Welcome back, {`user! :)`}
						{children}
					</section>
					<LogoutBtn />
				</div>
			</main>
		</>
	);
};

export default Account;
