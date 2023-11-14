import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import PageContent from '../../ui/wrappers/PageContent';
import Redirect from '../generic/Redirect';

import classes from './CheckoutSuccessful.module.css';

const CheckoutSuccessful = ({ userData, order, orderSentSuccessfuly }) => {
	const isError = (orderSentSuccessfuly && orderSentSuccessfuly.status !== 200) || !orderSentSuccessfuly;
	const pageTitle = isError ? 'Something went wrong!' : 'Order sent!';

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
			<h2 className={classes.h2}>Thanks for choosing us!</h2>
			{userData &&
				Object.entries(Object.fromEntries(userData)).map(element => {
					let title = element[0].charAt(0).toUpperCase() + element[0].slice(1);
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

	const orderContent = <section className={classes['order-content']}></section>;

	return (
		<PageContent title={pageTitle}>
			<div className={classes.wrapper}>
				{isError && <h2 className={classes.h2}>An error has occured, please try again later.</h2>}
				{!isError && formDataContent}
				{/* {!isError && orderContent} */}
			</div>

			<Redirect componentType="link" to="/">
				Return to the home page
			</Redirect>
		</PageContent>
	);
};

export default CheckoutSuccessful;
