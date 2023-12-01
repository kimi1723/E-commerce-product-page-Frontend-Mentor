import { useLocation, useNavigate } from 'react-router-dom';

import ReactSelect from '../ui/react-select/ReactSelect';
import SignoutBtn from '../ui/buttons/signout-btn/SignoutBtn';

import classes from './AccountRoot.module.css';

const AccountRoot = ({ children }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const navOptions = [
		{ label: 'My account', value: 'myaccount' },
		{ label: 'Orders', value: 'orders' },
		{ label: 'Credentials', value: 'credentials' },
		{ label: 'Personal information', value: 'personal-information' },
	];

	const currentPathIndex = navOptions.findIndex(option => pathname.includes(option.value));

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
