const BillingDetails = ({ classes }) => {
	return (
		<section className={`${classes['form-section']}`}>
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
				<input id="email" name="email" type="email" placeholder="Enter email..." className={classes['text-input']} />
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
	);
};

export default BillingDetails;
