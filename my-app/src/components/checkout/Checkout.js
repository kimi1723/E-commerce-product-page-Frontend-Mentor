import { useNavigate } from 'react-router-dom';
import Wrapper from '../ui/Wrapper';

import classes from './Checkout.module.css';

const Checkout = () => {
	const navigate = useNavigate();

	return (
		<Wrapper>
			<nav className={classes.nav}>
				<button type="button" className={classes['go-back-btn']} onClick={() => navigate(-1)}>
					Go back
				</button>
			</nav>
			<main className={classes.main}>
				<section className={classes.checkout}>
					<h1 className={classes.h1}>Checkout</h1>
					<form>
						<section className={classes['billing-details']}>
							<h2>Billing details</h2>

							<label htmlFor="name">Name</label>
							<input id="name" name="name" type="text" placeholder="Enter name..." />

							<label htmlFor="email">Email Address</label>
							<input id="email" name="email" type="email" placeholder="Enter email..." />

							<label htmlFor="tel">Phone Number</label>
							<input id="tel" name="tel" type="tel" placeholder="Enter phone number..." minLength="7" maxLength="11" />
						</section>

						<section className={classes['shipping-info']}>
							<h2>Shipping info</h2>

							<label htmlFor="address">Address</label>
							<input id="address" name="address" type="text" placeholder="Enter address..." />

							<label htmlFor="zip-code">ZIP Code</label>
							<input id="zip-code" name="zip-code" type="number" placeholder="Enter ZIP Code..." />

							<label htmlFor="city">City</label>
							<input id="city" name="city" type="text" placeholder="Enter city..." />

							<label htmlFor="country">Country</label>
							<input id="country" name="country" type="text" placeholder="Enter country..." />
						</section>

						<section className={classes['payment-details']}>
							<h2>Payment details</h2>

							<fieldset>
								<legend>Choose payment method</legend>

								<label htmlFor="card">Card</label>
								<input type="radio" id="card" name="payment-method" />

								<label htmlFor="bank">Bank</label>
								<input type="radio" id="bank" name="payment-method" />

								<label htmlFor="cash">Cash</label>
								<input type="radio" id="cash" name="payment-method" />
							</fieldset>
						</section>
					</form>
				</section>
				<section className={classes.summary}></section>
			</main>
		</Wrapper>
	);
};

export default Checkout;
