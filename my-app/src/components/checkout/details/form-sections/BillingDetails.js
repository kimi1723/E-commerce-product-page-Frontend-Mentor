import { useState, useEffect } from 'react';
import useValidation from '../../../../hooks/useValidation';

const BillingDetails = ({ classes, setAllErrors, setAllIsTouched }) => {
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [telValue, setTelValue] = useState('');
	const [errors, setErrors] = useState({
		name: false,
		email: false,
		tel: false,
	});
	const [isTouched, setIsTouched] = useState({
		name: false,
		email: false,
		tel: false,
	});

	useValidation(nameValue, 'name', isTouched.name, setErrors);
	useValidation(emailValue, 'email', isTouched.email, setErrors);
	useValidation(telValue, 'tel', isTouched.tel, setErrors);

	useEffect(() => {
		setAllErrors(errors);
	}, [errors]);

	useEffect(() => {
		setAllIsTouched(isTouched);
	}, [isTouched]);

	const nameHandler = e => {
			setNameValue(e.target.value);
			isTouchedNameHandler();
		},
		emailHandler = e => {
			setEmailValue(e.target.value);
			isTouchedEmailHandler();
		},
		telHandler = e => {
			setTelValue(e.target.value);
			isTouchedTelHandler();
		};

	const isTouchedNameHandler = () => {
			setIsTouched(prev => {
				return { ...prev, name: true };
			});
		},
		isTouchedEmailHandler = () => {
			setIsTouched(prev => {
				return { ...prev, email: true };
			});
		},
		isTouchedTelHandler = () => {
			setIsTouched(prev => {
				return { ...prev, tel: true };
			});
		};

	return (
		<section className={`${classes['form-section']}`}>
			<h2 className={classes.h2}>Billing details</h2>

			<div className={classes['inputs-container']}>
				{errors.name && isTouched.name && (
					<p className={classes.error}>Your name should contain at least 3 characters!</p>
				)}
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
					onChange={nameHandler}
					onBlur={isTouchedNameHandler}
				/>
			</div>

			<div className={classes['inputs-container']}>
				{errors.email && isTouched.email && <p className={classes.error}>Please enter a valid email address!</p>}
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
					onChange={emailHandler}
					onBlur={isTouchedEmailHandler}
				/>
			</div>

			<div className={classes['inputs-container']}>
				{errors.tel && isTouched.tel && <p className={classes.error}>Please enter a valid phone number!</p>}
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
					onChange={telHandler}
					onBlur={isTouchedTelHandler}
				/>
			</div>
		</section>
	);
};

export default BillingDetails;
