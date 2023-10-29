import Select from 'react-select';

import classes from './CheckoutDetails.module.css';
import cardImg from '../../../assets/images/checkout-details/credit-card-23250_640.png';

const Details = ({ countriesList }) => {
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
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Checkout Details</h1>
			</header>

			<main className={classes.main}>
				<form className={classes.form}>
					<section className={`${classes['billing-details']} ${classes['form-section']}`}>
						<h2 className={classes.h2}>Billing details</h2>

						<div className={classes['inputs-container']}>
							<label htmlFor="name" className={classes.label}>
								Name
							</label>
							<input id="name" name="name" type="text" placeholder="Enter name..." className={classes['text-input']} />
						</div>

						<div className={classes['inputs-container']}>
							<label htmlFor="email" className={classes.label}>
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="Enter email..."
								className={classes['text-input']}
							/>
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

					<section className={`${classes['payment-details']} ${classes['form-section']}`}>
						<h2 className={classes.h2}>Payment details</h2>

						<fieldset className={classes.fieldset}>
							<legend className={classes.legend}>Choose payment method</legend>

							<div className={classes['radio-inputs-container']}>
								<input type="radio" id="card" name="payment-method" className={classes['radio-input']} />
								<label htmlFor="card" className={`${classes.label} ${classes['radio-input-label']}`}>
									Card
									<div className={classes['hero-bg']}></div>
								</label>
							</div>

							<div className={classes['radio-inputs-container']}>
								<input type="radio" id="bank" name="payment-method" className={classes['radio-input']} />
								<label htmlFor="bank" className={`${classes.label} ${classes['radio-input-label']}`}>
									Bank
									<div className={classes['hero-bg']}></div>
								</label>
							</div>

							<div className={classes['radio-inputs-container']}>
								<input type="radio" id="cash" name="payment-method" className={classes['radio-input']} />
								<label htmlFor="cash" className={`${classes.label} ${classes['radio-input-label']}`}>
									Cash
									<div className={classes['hero-bg']}></div>
								</label>
							</div>
						</fieldset>
					</section>
				</form>
			</main>
		</>
	);
};

export default Details;
