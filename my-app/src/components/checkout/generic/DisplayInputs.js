import { useState, useEffect } from 'react';

import useValidation from '../../../hooks/useValidationRefactor';

import getInputType from '../../../utils/getInputType';
import getInputLabel from '../../../utils/getInputLabel';
import getInputPlaceholder from '../../../utils/getInputPlaceholder';

import Select from 'react-select';

const DisplayInputs = ({ classes, countriesList, setAllErrors, setAllIsTouched, data, countrySelectStyles }) => {
	const [inputsValues, setInputsValues] = useState(data);
	const [isTouchedState, setIsTouchedState] = useState({});

	const errors = useValidation(inputsValues, isTouchedState);

	const inputsKeys = Object.keys(inputsValues);

	useEffect(() => {
		const initialData = {};
		const dataValues = Object.values(data);
		const isTouchedValue = dataValues.includes('') ? false : true;

		inputsKeys.forEach(key => {
			initialData[key] = isTouchedValue;
		});

		setIsTouchedState(initialData);
	}, []);

	useEffect(() => {
		setAllErrors(errors);
	}, [errors]);

	useEffect(() => {
		setAllIsTouched(isTouchedState);
	}, [isTouchedState]);

	const inputTouchedStateHandler = e => {
			const key = e.target.name;
			setIsTouchedState(prevValues => ({ ...prevValues, [key]: true }));
		},
		countryTouchedHandler = () => setIsTouchedState(prevValues => ({ ...prevValues, country: true }));

	const inputChangeHandler = e => {
			const key = e.target.name;
			const value = e.target.value;

			inputTouchedStateHandler(e);
			setInputsValues(prevValues => ({ ...prevValues, [key]: value }));
		},
		countryChangeHandler = e => {
			setIsTouchedState(prevValues => ({ ...prevValues, country: true }));
			setInputsValues(prevValues => ({ ...prevValues, country: e.value }));
		};

	const content = inputsKeys.map(key => {
		const { isError, errorFeedback } = errors[key] || {};
		const isTouched = isTouchedState[key];

		const inputType = getInputType(key);
		const inputPlaceholder = getInputPlaceholder(key);
		const label = getInputLabel(key);

		let value = inputsValues[key];

		return (
			<div className={classes['inputs-container']} key={key}>
				{isError && isTouched && <p className={classes.error}>{errorFeedback}</p>}
				<label htmlFor={key} className={classes.label}>
					{label}
				</label>

				{key !== 'country' && (
					<input
						id={key}
						name={key}
						type={inputType}
						placeholder={inputPlaceholder}
						className={classes['text-input']}
						onChange={inputChangeHandler}
						onBlur={inputTouchedStateHandler}
						value={value}
					/>
				)}

				{key === 'country' && (
					<Select
						options={countriesList}
						placeholder="Select country..."
						noOptionsMessage={() => 'Country unavailable'}
						aria-label="Select country"
						inputId="country"
						name="country"
						styles={countrySelectStyles}
						onChange={countryChangeHandler}
						onBlur={countryTouchedHandler}
						// value={countryValue}
					/>
				)}
			</div>
		);
	});

	return content;
};

export default DisplayInputs;
