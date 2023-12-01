import DisplayInputs from '../../display-inputs/DisplayInputs';

const billingDetailsSkeleton = {
	name: '',
	email: '',
	tel: '',
};

const BillingDetails = ({ classes, setAllErrors, setAllIsTouched, billingDetails }) => {
	return (
		<section className={`${classes['form-section']}`}>
			<h2 className={classes.h2}>Billing details</h2>

			<DisplayInputs
				classes={classes}
				setAllErrors={setAllErrors}
				setAllIsTouched={setAllIsTouched}
				data={billingDetails || billingDetailsSkeleton}
			/>
		</section>
	);
};

export default BillingDetails;
