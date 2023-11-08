import { Form } from 'react-router-dom';
import { useState } from 'react';
import BillingDetails from './form-sections/BillingDetails';
import ShippingInfo from './form-sections/ShippingInfo';
import PaymentDetails from './form-sections/PaymentDetails';

import Redirect from '../generic/Redirect';
import classes from './CheckoutDetails.module.css';

const Details = ({ countriesList }) => {
	const [allErrors, setAllErrors] = useState({});
	const isButtonDisabled = Object.values(allErrors).includes(true);

	const allErrorsHandler = newErrorsState => {
		setAllErrors(prevErrorState => {
			return { ...prevErrorState, ...newErrorsState };
		});
	};

	const submitHandler = () => {
		if (Object.values(allErrors).includes(true)) {
			console.log('error');
		} else {
			console.log('no error');
		}
	};

	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Checkout Details</h1>
			</header>

			<main className={classes.main}>
				<Form method="post" className={classes.form} action="/checkout/done">
					<BillingDetails classes={classes} setAllErrors={allErrorsHandler} />
					<ShippingInfo classes={classes} countriesList={countriesList} setAllErrors={allErrorsHandler} />
					<PaymentDetails classes={classes} setAllErrors={allErrorsHandler} />

					<Redirect componentType="button" type="submit" disabled={isButtonDisabled}>
						Next
					</Redirect>
				</Form>
			</main>
		</>
	);
};

export default Details;
