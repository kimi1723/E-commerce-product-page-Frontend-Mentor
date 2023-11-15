import Products from '../generic/Products';
import PageContent from '../../ui/wrappers/PageContent';
import Redirect from '../generic/Redirect';

import classes from './CheckoutSuccessful.module.css';

const CheckoutSuccessful = ({ userData, orderData = {}, orderSentSuccessfuly }) => {
	const isError = (orderSentSuccessfuly && orderSentSuccessfuly.status !== 200) || !orderSentSuccessfuly;
	const pageTitle = isError ? 'Something went wrong!' : 'Order sent!';

	console.log(orderSentSuccessfuly);

	// const dataElements = () => {
	// 	return Object.entries(Object.fromEntries(userData)).map(element => {
	// 		let title = element[0].charAt(0).toUpperCase() + element[0].slice(1);
	// 		let value = element[1];

	// 		if (title.includes('-')) title = title.replace('-', ' ');

	// 		if (title === 'Payment method') value = value.charAt(0).toUpperCase() + value.slice(1);

	// 		return (
	// 			<div key={title} className={classes.div}>
	// 				<dt className={classes.title}>{`${title}:`}</dt>
	// 				<dd className={classes.value}>{value}</dd>
	// 			</div>
	// 		);
	// 	});
	// };

	const formDataContent = (
		<section className={classes['form-data']}>
			<h2 className={classes.h2}>Informations provided:</h2>
			{/* <h2 className={classes.h2}>Thank you for choosing us!</h2> */}
			{userData &&
				Object.entries(Object.fromEntries(userData)).map(element => {
					let title = element[0].charAt(0).toUpperCase() + element[0].slice(1);
					let value = element[1];

					if (title.includes('-')) title = title.replace('-', ' ');

					return (
						<div key={title} className={classes.div}>
							<dt className={classes.title}>{`${title}:`}</dt>
							<dd className={classes.value}>{value}</dd>
						</div>
					);
				})}
		</section>
	);

	const orderList = (
		<ul>
			{orderData.products.map(({ id, alt }) => (
				<li key={id}></li>
			))}
		</ul>
	);

	console.log(orderList);

	const orderContent = (
		<section className={classes['order-content']}>
			<h2 className={classes.h2}>Products ordered:</h2>
			<Products productsData={orderData.products} />
		</section>
	);

	return (
		<PageContent title={pageTitle}>
			<div className={classes.wrapper}>
				{isError && <h2 className={classes.h2}>An error has occured, please try again later.</h2>}
				{!isError && formDataContent}
				{!isError && orderContent}
			</div>

			<Redirect componentType="link" to="/">
				Return to the home page
			</Redirect>
		</PageContent>
	);
};

export default CheckoutSuccessful;
