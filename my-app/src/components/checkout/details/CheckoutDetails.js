import { Form } from 'react-router-dom';
import BillingDetails from './form-sections/BillingDetails';
import ShippingInfo from './form-sections/ShippingInfo';
import PaymentDetails from './form-sections/PaymentDetails';

import Redirect from '../generic/Redirect';
import classes from './CheckoutDetails.module.css';

const Details = ({ countriesList }) => {
	return (
		<>
			<header className={classes.header}>
				<h1 className={classes.h1}>Checkout Details</h1>
			</header>

			<main className={classes.main}>
				<Form method="post" className={classes.form} action="/checkout/done">
					<BillingDetails classes={classes} />
					<ShippingInfo classes={classes} countriesList={countriesList} />
					<PaymentDetails classes={classes} />

					<Redirect componentType="button" type="submit">
						Next
					</Redirect>
				</Form>
			</main>
		</>
	);
};

export default Details;
