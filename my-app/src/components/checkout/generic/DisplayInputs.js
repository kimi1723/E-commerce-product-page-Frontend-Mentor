import { useState, useEffect } from 'react';

import useValidation from '../../../hooks/useValidationRefactor';

import getInputType from '../../../utils/getInputType';
import getInputLabel from '../../../utils/getInputLabel';
import getInputPlaceholder from '../../../utils/getInputPlaceholder';

import Select from 'react-select';

const shipmentDetailsDataSkeleton = {
	address: '',
	city: '',
	country: '',
	zipCode: '',
};

const DisplayInputs = ({ classes, countriesList, setAllErrors, setAllIsTouched, shipmentDetails }) => {
	const [inputsValues, setInputsValues] = useState(shipmentDetails || shipmentDetailsDataSkeleton);
	const [isTouchedState, setIsTouchedState] = useState({});

	const errors = useValidation(inputsValues);

	const inputsKeys = Object.keys(inputsValues);

	useEffect(() => {
		const initialData = {};

		inputsKeys.forEach(key => {
			initialData[key] = false;
		});

		setIsTouchedState(initialData);
	}, []);

	useEffect(() => {
		setAllErrors(errors);
	}, [errors]);

	useEffect(() => {
		setAllIsTouched(isTouchedState);
	}, [isTouchedState]);

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

	const inputChangeHandler = e => {
		const key = e.target.name;
		const value = e.target.value;

		setIsTouchedState(prevValues => ({ ...prevValues, [key]: true }));
		setInputsValues(prevValues => ({ ...prevValues, [key]: value }));
	};

	const content = inputsKeys.map(key => {
		const { isError, errorFeedback } = errors[key] || {};
		const isTouched = isTouchedState[key];

		const inputType = getInputType(key);
		const inputPlaceholder = getInputPlaceholder(key);
		const label = getInputLabel(key);

		let value = inputsValues[key];

		if (!isTouched && value.length === 0) value = 'Yet to be filled!';

		return (
			<div className={classes['inputs-container']} key={key}>
				{isError && isTouched && <p className={classes.error}>{errorFeedback}</p>}
				<label htmlFor={key} className={classes.label}>
					{label}
				</label>
				<input
					id={key}
					name={key}
					type={inputType}
					placeholder={inputPlaceholder}
					className={classes['text-input']}
					onChange={inputChangeHandler}
				/>
			</div>
		);
	});

	return (
		<section className={`${classes['shipping-info']} ${classes['form-section']}`}>
			<h2 className={classes.h2}>Shipment details</h2>
			{content}
		</section>
	);
};

export default DisplayInputs;
