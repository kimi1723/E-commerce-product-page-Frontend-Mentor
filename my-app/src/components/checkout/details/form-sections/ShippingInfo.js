import Select from 'react-select';

const ShippingInfo = ({ classes, countriesList }) => {
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
			<h2 className={classes.h2}>Shipping info</h2>

			<div className={classes['inputs-container']}>
				<label htmlFor="address" className={classes.label}>
					Address
				</label>
				<input
					id="address"
					name="address"
					type="text"
					placeholder="Enter address..."
					className={classes['text-input']}
				/>
			</div>

			<div className={classes['inputs-container']}>
				<label htmlFor="zip-code" className={classes.label}>
					ZIP Code
				</label>
				<input
					id="zip-code"
					name="zip-code"
					type="number"
					placeholder="Enter ZIP Code..."
					className={classes['text-input']}
				/>
			</div>

			<div className={classes['inputs-container']}>
				<label htmlFor="city" className={classes.label}>
					City
				</label>
				<input id="city" name="city" type="text" placeholder="Enter city..." className={classes['text-input']} />
			</div>

			<div className={classes['inputs-container']}>
				<label htmlFor="country" className={classes.label}>
					Country
				</label>
				<Select
					options={countriesList}
					placeholder="Select country..."
					noOptionsMessage={() => 'Country unavailable'}
					aria-label="Select country"
					inputId="country"
					name="country"
					styles={customStyles}
				/>
			</div>
		</section>
	);
};

export default ShippingInfo;
