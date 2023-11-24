import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';

import classes from './ShipmentDetails.module.css';
import useValidation from '../../../hooks/useValidationRefactor';

const inputTypeHandler = label => {
	switch (label) {
		case 'email':
			return 'email';
		case 'tel':
			return 'tel';
		case 'zip-code':
			return 'number';
		default:
			return 'text';
	}
};

// const errorFeedBackHandler = label => {
//     switch:
// }

const ShipmentDetails = ({ data }) => {
	const [inputValues, setInputValues] = useState(data);
	const [errors, setErrors] = useState({});

	useValidation(inputValues, true, setErrors);

	const shipmentDetailsKeys = Object.keys(data);

	useEffect(() => {
		const errorsInitial = {};

		shipmentDetailsKeys.forEach(key => (errorsInitial[key] = false));

		setErrors(errorsInitial);
	}, []);

	const inputChangeHandler = e => {
		const label = e.target.name;
		const value = e.target.value;

		setInputValues(prevValues => {
			return { ...prevValues, [label]: value };
		});
	};

	const onSubmitHandler = label => {};

	const shipmentDetailsMapped = shipmentDetailsKeys.map(label => {
		const inputType = inputTypeHandler(label);
		const { isError, errorFeedback } = errors[label];

		return (
			<div className={classes['item-container']} key={label}>
				<dt>
					<label htmlFor={label}>{label}</label>
				</dt>

				<dd>
					<Form method="post" className={classes.form} onSubmit={onSubmitHandler}>
						{isError && <p className={classes.error}>{errorFeedback}</p>}
						<input type={inputType} name={label} value={inputValues[label]} onChange={inputChangeHandler} />

						<div className={classes['form-btns']}>
							{/* <button type="submit">Accept</button> */}
							{/* <button type="button">Cancel</button> */}
						</div>
					</Form>
				</dd>
			</div>
		);
	});

	return (
		<>
			<h1>Shipment detailss</h1>
			<dl>{shipmentDetailsMapped}</dl>
		</>
	);
};

export default ShipmentDetails;
