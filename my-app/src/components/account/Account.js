import ReactSelect from '../ui/ReactSelect';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutBtn from '../ui/LogoutBtn';

import classes from './Account.module.css';

const Account = () => {
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
		<main className={classes.main}>
			<section className={classes['main-container']}>
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
					<section className={classes['content-section']}>Welcome back, {`user! :)`}</section>
				</div>
			</section>
		</main>
	);
};

export default Account;
