import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';
import { useEffect, useRef } from 'react';

import PageContent from '../../ui/wrappers/PageContent';
import Redirect from '../generic/Redirect';

import classes from './CheckoutSuccessful.module.css';

const CheckoutSuccessful = ({ userData }) => {
	const dispatch = useDispatch();
	const pageTitle = useRef('');
	const content = useRef('');

	useEffect(() => {
		if (!userData) {
			pageTitle.current = 'Unexpected entry';

			content.current = <h2 className={classes.h2}>An error has occured, please head back to the home page.</h2>;
		} else {
			dispatch(cartActions.replaceCart({ products: [], totalQuantity: 0 }));
		}
	}, []);

	if (userData) {
		pageTitle.current = ' Checkout succesful, thank you!';

		const dataElements = Object.entries(Object.fromEntries(userData)).map(element => {
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
		});

		content.current = (
			<>
				<h2 className={classes.h2}>Checkout commited with following data:</h2>
				{dataElements}
			</>
		);
	}

	return (
		<PageContent title={pageTitle.current}>
			<div className={classes['list-wrapper']}>{content.current}</div>

			<Redirect componentType="link" to="/">
				Return to the home page
			</Redirect>
		</PageContent>
	);
};

export default CheckoutSuccessful;
