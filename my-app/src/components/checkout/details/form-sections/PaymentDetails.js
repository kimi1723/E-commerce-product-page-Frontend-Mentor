const PaymentDetails = ({ classes }) => {
	return (
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
	);
};

export default PaymentDetails;
