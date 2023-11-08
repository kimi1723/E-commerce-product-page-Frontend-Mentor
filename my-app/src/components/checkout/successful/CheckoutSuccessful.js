import PageContent from '../../ui/wrappers/PageContent';
import Redirect from '../generic/Redirect';

import classes from './CheckoutSuccessful.module.css';

const CheckoutDone = ({ data }) => {
	if (!data) {
		const pageTitle = 'Unexpected entry';

		return (
			<PageContent title={pageTitle}>
				<h2 className={classes.h2}>Please head back to our main site!</h2>
			</PageContent>
		);
	}

	const pageTitle = ' Checkout succesful, thank you!';

	const dataElements = Object.entries(Object.fromEntries(data)).map(element => {
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

	return (
		<PageContent title={pageTitle}>
			<div className={classes['list-wrapper']}>
				<h2 className={classes.h2}>Checkout commited with following data:</h2>
				{dataElements}
			</div>

			<Redirect componentType="link" to="/">
				Return to the home page
			</Redirect>
		</PageContent>
	);
};

export default CheckoutDone;
