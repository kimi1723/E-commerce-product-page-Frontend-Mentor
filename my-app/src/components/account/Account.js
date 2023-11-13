import Select from 'react-select';

import { Link } from 'react-router-dom';

import classes from './Account.module.css';

const Account = ({ isSignedIn }) => {
	console.log(isSignedIn);
	const navOptions = [
		{ label: 'My account', value: 'account' },
		{ label: 'Orders', value: 'orders' },
		{ label: 'Personal information', value: 'personal-information' },
		{ label: 'Shipment information', value: 'shipment-information' },
	];

	const customStyles = {
		option: (styles, state) => ({
			...styles,
			backgroundColor: state.isSelected ? 'hsl(26, 100%, 55%)' : 'white',
			transition: 'background-color 0.3s',
			cursor: 'pointer',
			'&:hover': { backgroundColor: 'hsl(25, 100%, 94%)' },
		}),
		control: (styles, state) => ({
			...styles,
			minHeight: '43px',
			fontSize: '0.9rem',
			border: state.isFocused ? '2px solid hsl(26, 100%, 55%)' : '2px solid rgba(0, 0, 0, 0.5)',
			borderRadius: '8px',
			boxShadow: state.isFocused ? '0px 1px 5px 1px hsl(26, 100%, 55%)' : 'none',
			transition: 'border-color 0.3s, box-shadow 0.3s',
			cursor: 'pointer',
			'&:hover': { borderColor: 'hsl(26, 100%, 55%)' },
		}),
	};

	return (
		<main className={classes.main}>
			<section className={classes['main-container']}>
				<h2 className={classes.h2}>My account</h2>
				<div className={classes['sections-container']}>
					<nav className={classes.nav}>
						<Select options={navOptions} defaultValue="My account" styles={customStyles}></Select>
						{/* <ul className={classes.list}>
							<li className={classes.li}>
								<Link className={classes.link}>Account settings</Link>
							</li>
							<li className={classes.li}>
								<Link className={classes.link}>My orders</Link>
							</li>
							<li className={classes.li}>
								<button className={classes.btn}>Logout</button>
							</li>
						</ul> */}
					</nav>
					<section className={classes['content-section']}>Hi, user!</section>
				</div>
			</section>
		</main>
	);
};

export default Account;
