import { useState } from 'react';
import { Form } from 'react-router-dom';

import BillingDetails from './form-sections/BillingDetails';
import ShippingInfo from './form-sections/ShippingInfo';
import PaymentDetails from './form-sections/PaymentDetails';

import Redirect from '../generic/Redirect';
import classes from './CheckoutDetails.module.css';

const Details = ({ countriesList }) => {
	const [allErrors, setAllErrors] = useState({});
	const [allIsTouched, setAllIsTouched] = useState({});
	const isAnyError = Object.values(allErrors).includes(true);
	const notEverythingTouched = Object.values(allIsTouched).includes(false);

	const allErrorsHandler = newErrorsState => setAllErrors(prevErrorState => ({ ...prevErrorState, ...newErrorsState }));

	const allIsTouchedHandler = newTouchedState =>
		setAllIsTouched(prevTouchedState => ({ ...prevTouchedState, newTouchedState }));

	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Checkout Details</h1>
			</header>

			<main className={classes.main}>
				<Form method="post" className={classes.form} action="/checkout-successful">
					<BillingDetails classes={classes} setAllErrors={allErrorsHandler} setAllIsTouched={allIsTouchedHandler} />
					<ShippingInfo
						classes={classes}
						countriesList={countriesList}
						setAllErrors={allErrorsHandler}
						setAllIsTouched={allIsTouchedHandler}
					/>
					<PaymentDetails classes={classes} setAllErrors={allErrorsHandler} />

					<Redirect componentType="button" type="submit" isDisabled={isAnyError || notEverythingTouched}>
						Next
					</Redirect>
				</Form>
			</main>
		</>
	);
};

export default Details;
