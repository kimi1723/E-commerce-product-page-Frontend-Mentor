import Select from 'react-select';

import classes from './ShipmentDetails.module.css';

const Details = ({ countriesList }) => {
	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Shipment Details</h1>
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
							<Select
								options={countriesList}
								placeholder="Select country..."
								noOptionsMessage={() => 'Country unavailable'}
								aria-label="Select country"
							/>
						</div>
					</section>

					<section className={`${classes['payment-details']} ${classes['form-section']}`}>
						<h2 className={classes.h2}>Payment details</h2>

						<fieldset>
							<legend>Choose payment method</legend>

							<label htmlFor="card" className={classes.label}>
								Card
							</label>
							<input type="radio" id="card" name="payment-method" />

							<label htmlFor="bank" className={classes.label}>
								Bank
							</label>
							<input type="radio" id="bank" name="payment-method" />

							<label htmlFor="cash" className={classes.label}>
								Cash
							</label>
							<input type="radio" id="cash" name="payment-method" />
						</fieldset>
					</section>
				</form>
			</main>
		</>
	);
};

export default Details;
