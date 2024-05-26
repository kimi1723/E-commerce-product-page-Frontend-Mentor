import Products from '../../ui/products/Products';
import PageContent from '../../ui/wrappers/page-content/PageContent';
import Redirect from '../redirect/Redirect';
import PricingDetails from '../../ui/pricing-details/PricingDetails';

import getInputLabel from '../../../utils/getInputLabel';

import classes from './Successful.module.css';

const Successful = ({
	userData,
	orderData: { products, discount, totalPrice, totalQuantity } = {},
	orderSentSuccessfuly,
	personalInformationSentSuccessfuly,
}) => {
	const isError =
		(orderSentSuccessfuly &&
			orderSentSuccessfuly.status !== 200 &&
			personalInformationSentSuccessfuly &&
			personalInformationSentSuccessfuly.status !== 200) ||
		!orderSentSuccessfuly ||
		!personalInformationSentSuccessfuly;

	const pageTitle = isError ? 'Something went wrong!' : 'Order sent!';

	const formDataContent = (
		<section className={classes['form-data']}>
			<h2 className={classes.h2}>Informations provided:</h2>
			{userData &&
				Object.entries(Object.fromEntries(userData)).map(element => {
					let title = getInputLabel(element[0]);
					let value = element[1];

					if (title.includes('-')) title = title.replace('-', ' ');
					if (title === 'Payment method') value = value.charAt(0).toUpperCase() + value.slice(1);

					return (
						<div key={title} className={classes.div}>
							<dt className={classes.title}>{`${title}:`}</dt>
							<dd className={classes.value}>{value}</dd>
						</div>
					);
				})}
		</section>
	);

	const orderContent = (
		<section className={classes['order-content']}>
			<h2 className={classes.h2}> {totalQuantity} products ordered:</h2>
			<Products productsData={products} discount={discount.discountType} />
			<PricingDetails productsTotal={totalPrice} discount={discount.discountType} />
		</section>
	);

	const successfulContent = (
		<>
			{formDataContent}
			{orderContent}
			<h2 className={classes.h2}>Thank you for shopping with us!</h2>
		</>
	);

	return (
		<PageContent title={pageTitle}>
			<div className={classes.wrapper}>
				{isError && <h2 className={classes.h2}>An error has occured, please try again later.</h2>}
				{!isError && successfulContent}
			</div>

			<Redirect componentType="link" to="/">
				Return to the home page
			</Redirect>
		</PageContent>
	);
};

export default Successful;
