import { useState } from 'react';
import { Form } from 'react-router-dom';

import BillingDetails from './form-sections/BillingDetails';
import ShippingInfo from './form-sections/ShipmentDetails';
import PaymentDetails from './form-sections/PaymentDetails';
import Redirect from '../redirect/Redirect';

import unwrapObject from '../../../utils/unwrapObject';

import classes from './Details.module.css';

const Details = ({ loadedData: { countriesList, personalInformation } }) => {
	const [allErrors, setAllErrors] = useState({});
	const [allIsTouched, setAllIsTouched] = useState({});

	const isAnyError = Object.values(allErrors).filter(({ isError }) => isError === true);
	const notEverythingTouched = Object.values(allIsTouched).includes(false);

	const allErrorsHandler = newErrorsState => setAllErrors(prevErrorState => ({ ...prevErrorState, ...newErrorsState }));

	const allIsTouchedHandler = newTouchedState =>
		setAllIsTouched(prevTouchedState => ({ ...prevTouchedState, ...newTouchedState }));

	const billingDetails = unwrapObject(['name', 'email', 'tel'], personalInformation);
	const shipmentDetails = unwrapObject(['address', 'city', 'country', 'zipCode'], personalInformation);

	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Checkout Details</h1>
			</header>

			<main className={classes.main}>
				<Form method="post" className={classes.form} action="/checkout-successful" state={{ some: 'value' }}>
					<BillingDetails
						classes={classes}
						setAllErrors={allErrorsHandler}
						setAllIsTouched={allIsTouchedHandler}
						billingDetails={billingDetails}
					/>
					<ShippingInfo
						classes={classes}
						countriesList={countriesList}
						setAllErrors={allErrorsHandler}
						setAllIsTouched={allIsTouchedHandler}
						shipmentDetails={shipmentDetails}
					/>
					<PaymentDetails classes={classes} setAllErrors={allErrorsHandler} />

					<Redirect componentType="button" type="submit" isDisabled={isAnyError.length > 0 || notEverythingTouched}>
						Next
					</Redirect>
				</Form>
			</main>
		</>
	);
};

export default Details;
