import { useState, useEffect } from 'react';
import useValidation from '../../../../hooks/useValidation';
import useValidationRefactor from '../../../../hooks/useValidationRefactor';
import DisplayInputs from '../../generic/DisplayInputs';
import Select from 'react-select';

const shipmentDetailsDataSkeleton = {
	address: '',
	city: '',
	country: '',
	zipCode: '',
};

const ShipmentDetails = ({ classes, countriesList, setAllErrors, setAllIsTouched, shipmentDetails }) => {
	const [inputsValues, setInputsValues] = useState(shipmentDetails || shipmentDetailsDataSkeleton);
	const errors = useValidationRefactor(inputsValues);

	const [isTouchedState, setIsTouchedState] = useState({
		address: false,
		zipCode: false,
		city: false,
		country: false,
	});

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

	return (
		<DisplayInputs
			classes={classes}
			countriesList={countriesList}
			setAllErrors={setAllErrors}
			setAllIsTouched={setAllIsTouched}
			shipmentDetails={shipmentDetails}
		/>
	);

	// return (
	// 	<section className={`${classes['shipping-info']} ${classes['form-section']}`}>
	// 		<h2 className={classes.h2}>Shipment details</h2>

	// 		<div className={classes['inputs-container']}>
	// 			{errors.address && isTouched.address && (
	// 				<p className={classes.error}>Your address should contain at least 4 characters!</p>
	// 			)}
	// 			<label htmlFor="address" className={classes.label}>
	// 				Address
	// 			</label>
	// 			<input
	// 				id="address"
	// 				name="address"
	// 				type="text"
	// 				placeholder="Enter address..."
	// 				className={classes['text-input']}
	// 				onChange={addressHandler}

	// 				value={addressValue}
	// 			/>
	// 		</div>

	// 		<div className={classes['inputs-container']}>
	// 			{errors.zipCode && isTouchedState.zipCode && (
	// 				<p className={classes.error}>Your zip code should at least be 2 characters length!</p>
	// 			)}
	// 			<label htmlFor="zipCode" className={classes.label}>
	// 				ZIP Code
	// 			</label>
	// 			<input
	// 				id="zipCode"
	// 				name="zipCode"
	// 				type="text"
	// 				placeholder="Enter ZIP Code..."
	// 				className={classes['text-input']}
	// 				onChange={zipCodeHandler}

	// 				value={zipCodeValue}
	// 			/>
	// 		</div>

	// 		<div className={classes['inputs-container']}>
	// 			{errors.city && isTouched.city && (
	// 				<p className={classes.error}>Your city should at least be 5 characters length!</p>
	// 			)}
	// 			<label htmlFor="city" className={classes.label}>
	// 				City
	// 			</label>
	// 			<input
	// 				id="city"
	// 				name="city"
	// 				type="text"
	// 				placeholder="Enter city..."
	// 				className={classes['text-input']}
	// 				onChange={cityHandler}
	// 				onBlur={isTouchedCityHandler}
	// 				value={cityValue}
	// 			/>
	// 		</div>

	// 		<div className={classes['inputs-container']}>
	// 			{errors.country && isTouched.country && <p className={classes.error}>Please enter a valid country!</p>}
	// 			<label htmlFor="country" className={classes.label}>
	// 				Country
	// 			</label>
	// 			<Select
	// 				options={countriesList}
	// 				placeholder="Select country..."
	// 				noOptionsMessage={() => 'Country unavailable'}
	// 				aria-label="Select country"
	// 				inputId="country"
	// 				name="country"
	// 				styles={customStyles}
	// 				onChange={countryHandler}
	// 				onBlur={isTouchedCountryHandler}
	// 				// value={countryValue}
	// 			/>
	// 		</div>
	// 	</section>
	// );
};

export default ShipmentDetails;
