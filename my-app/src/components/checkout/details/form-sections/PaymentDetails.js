import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PaymentDetails = ({ classes, setAllErrors }) => {
	const [errors, setErrors] = useState({
		payment: { isError: true, errorFeedback: 'Please select a proper payment!' },
	});
	const scale = 1.025;

	const choosePaymentHandler = () =>
		setErrors({ payment: { isError: false, errorFeedback: 'Please select a proper payment!' } });

	useEffect(() => {
		setAllErrors(errors);
	}, [errors]);

	const animatedDiv = children => (
		<motion.div
			whileHover={{ scale }}
			whileFocus={{ scale }}
			transition={{ type: 'spring', stiffness: 100 }}
			className={classes['radio-inputs-container']}>
			{children}
		</motion.div>
	);

	return (
		<section className={`${classes['payment-details']} ${classes['form-section']}`}>
			<h2 className={classes.h2}>Payment details</h2>

			<fieldset className={classes.fieldset} onChange={choosePaymentHandler}>
				<legend className={classes.legend}>Choose payment method</legend>

				{animatedDiv(
					<>
						<input type="radio" id="card" name="payment-method" className={classes['radio-input']} value="card" />
						<label htmlFor="card" className={`${classes.label} ${classes['radio-input-label']}`}>
							Card
							<div className={classes['hero-bg']}></div>
						</label>
					</>,
				)}

				{animatedDiv(
					<>
						<input type="radio" id="bank" name="payment-method" className={classes['radio-input']} value="bank" />
						<label htmlFor="bank" className={`${classes.label} ${classes['radio-input-label']}`}>
							Bank
							<div className={classes['hero-bg']}></div>
						</label>
					</>,
				)}

				{animatedDiv(
					<>
						<input type="radio" id="cash" name="payment-method" className={classes['radio-input']} value="cash" />
						<label htmlFor="cash" className={`${classes.label} ${classes['radio-input-label']}`}>
							Cash
							<div className={classes['hero-bg']}></div>
						</label>
					</>,
				)}
			</fieldset>
		</section>
	);
};

export default PaymentDetails;
