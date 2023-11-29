import DisplayInputs from '../../generic/DisplayInputs';

const shipmentDetailsDataSkeleton = {
	address: '',
	city: '',
	country: '',
	zipCode: '',
};

const ShipmentDetails = ({ classes, countriesList, setAllErrors, setAllIsTouched, shipmentDetails }) => {
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
		<section className={`${classes['shipping-info']} ${classes['form-section']}`}>
			<h2 className={classes.h2}>Shipment details</h2>
			<DisplayInputs
				classes={classes}
				countriesList={countriesList}
				setAllErrors={setAllErrors}
				setAllIsTouched={setAllIsTouched}
				data={shipmentDetails || shipmentDetailsDataSkeleton}
				countrySelectStyles={customStyles}
			/>
		</section>
	);
};

export default ShipmentDetails;
