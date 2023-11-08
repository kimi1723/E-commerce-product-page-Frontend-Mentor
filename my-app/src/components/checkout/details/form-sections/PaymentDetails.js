import { useState, useEffect } from 'react';

const PaymentDetails = ({ classes, setAllErrors }) => {
	const [chosenPayment, setChosenPayment] = useState(null);
	const [errors, setErrors] = useState({ payment: true });

	const choosePaymentHandler = e => {
		const chosenPayment = e.target.value;

		setChosenPayment(chosenPayment);

		setErrors(prev => {
			return { ...prev, payment: false };
		});
	};

	useEffect(() => {
		setAllErrors(errors);
	}, [errors]);

	return (
		<section className={`${classes['payment-details']} ${classes['form-section']}`}>
			<h2 className={classes.h2}>Payment details</h2>

			<fieldset className={classes.fieldset} onChange={choosePaymentHandler}>
				<legend className={classes.legend}>Choose payment method</legend>

				<div className={classes['radio-inputs-container']}>
					<input type="radio" id="card" name="payment-method" className={classes['radio-input']} value="card" />
					<label htmlFor="card" className={`${classes.label} ${classes['radio-input-label']}`}>
						Card
						<div className={classes['hero-bg']}></div>
					</label>
				</div>

				<div className={classes['radio-inputs-container']}>
					<input type="radio" id="bank" name="payment-method" className={classes['radio-input']} value="bank" />
					<label htmlFor="bank" className={`${classes.label} ${classes['radio-input-label']}`}>
						Bank
						<div className={classes['hero-bg']}></div>
					</label>
				</div>

				<div className={classes['radio-inputs-container']}>
					<input type="radio" id="cash" name="payment-method" className={classes['radio-input']} value="cash" />
					<label htmlFor="cash" className={`${classes.label} ${classes['radio-input-label']}`}>
						Cash
						<div className={classes['hero-bg']}></div>
					</label>
				</div>
			</fieldset>
		</section>
	);
};

export default PaymentDetails;
