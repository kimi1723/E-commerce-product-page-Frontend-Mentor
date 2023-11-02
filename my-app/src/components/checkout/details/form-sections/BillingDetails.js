import { useState, useEffect } from 'react';
import validateInput from '../../generic/validateInput';

const BillingDetails = ({ classes }) => {
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('e');
	const [telValue, setTelValue] = useState('');
	const [errors, setErrors] = useState({
		name: true,
		email: true,
		tel: true,
	});

	useEffect(() => {
		const timeout = setTimeout(() => {
			const isValidated = validateInput(nameValue, 'name');

			setErrors(prevErrors => {
				return { ...prevErrors, name: isValidated };
			});
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [nameValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const isValidated = validateInput(emailValue, 'email');

			setErrors(prevErrors => {
				return { ...prevErrors, email: isValidated };
			});
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [emailValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const isValidated = validateInput(telValue, 'tel');

			setErrors(prevErrors => {
				return { ...prevErrors, tel: isValidated };
			});
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [telValue]);

	const nameHandler = e => setNameValue(e.target.value),
		emailHandler = e => setEmailValue(e.target.value),
		telHandler = e => setTelValue(e.target.value);

	return (
		<section className={`${classes['form-section']}`}>
			<h2 className={classes.h2}>Billing details</h2>

			<div className={classes['inputs-container']}>
				{errors.name && <p className={classes.error}>Your name should contain at least 3 letters!</p>}
				<label htmlFor="name" className={classes.label}>
					Name
				</label>
				<input
					id="name"
					name="name"
					type="text"
					placeholder="Enter name..."
					className={classes['text-input']}
					value={nameValue}
					onChange={e => nameHandler(e)}
				/>
			</div>

			<div className={classes['inputs-container']}>
				{errors.email && <p className={classes.error}>Please enter a valid email address!</p>}
				<label htmlFor="email" className={classes.label}>
					Email Address
				</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="Enter email..."
					className={classes['text-input']}
					value={emailValue}
					onChange={e => emailHandler(e)}
				/>
			</div>

			<div className={classes['inputs-container']}>
				{errors.tel && <p className={classes.error}>Please enter a valid phone number!</p>}
				<label htmlFor="tel" className={classes.label}>
					Phone Number
				</label>
				<input
					id="tel"
					name="tel"
					type="tel"
					placeholder="Enter phone number..."
					minLength="7"
					maxLength="13"
					className={classes['text-input']}
					value={telValue}
					onChange={e => telHandler(e)}
				/>
			</div>
		</section>
	);
};

export default BillingDetails;
