import { useState, useEffect } from 'react';
import useValidateForm from '../../generic/useValidateForm';

const BillingDetails = ({ classes }) => {
	const [nameValue, setNameValue] = useState('');
	const [errors, setErrors] = useState({
		name: false,
		email: false,
		tel: false,
	});
	// const validate = useValidateForm();
	// console.log(validate);
	// validate('asdasd');

	const validate = useValidateForm();

	// useEffect(() => {
	// 	console.log(isNameError);
	// 	setErrors(prevErrors => {
	// 		return { ...prevErrors, name: isNameError };
	// 	});
	// }, [isNameError, nameValue]);

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		const isValidated = useValidateForm(nameValue, 'name');

	// 		setErrors(prevErrors => {
	// 			return { ...prevErrors, name: isValidated };
	// 		});
	// 	}, 1000);

	// 	return () => {
	// 		clearTimeout(timeout);
	// 	};
	// });

	const nameHandler = async e => {
		setNameValue(e.target.value);
		await validate(e.target.value, 'name');

		// const isValidated = await ValidateForm(e.target.value, 'name');

		// setErrors(prevErrors => {
		// return { ...prevErrors, name: isValidated };
		// });
		// console.log(isValidated);

		// setTimeout(() => {
		// const isError = e.target.value.trim().length < 3;

		// setErrors(prevErrors => {
		// return { ...prevErrors, name: isError };
		// });
		// }, 1000);
	};

	return (
		<section className={`${classes['form-section']}`}>
			<h2 className={classes.h2}>Billing details</h2>

			<div className={classes['inputs-container']}>
				<label htmlFor="name" className={classes.label}>
					Name
				</label>
				{errors.name && <p className={classes.error}>Name should contain at least 3 letters!</p>}
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
				<label htmlFor="email" className={classes.label}>
					Email Address
				</label>
				<input id="email" name="email" type="email" placeholder="Enter email..." className={classes['text-input']} />
			</div>

			<div className={classes['inputs-container']}>
				<label htmlFor="tel" className={classes.label}>
					Phone Number
				</label>
				<input
					id="tel"
					name="tel"
					type="tel"
					placeholder="Enter phone number..."
					minLength="7"
					maxLength="11"
					className={classes['text-input']}
				/>
			</div>
		</section>
	);
};

export default BillingDetails;
