import classes from './CheckoutSuccessful.module.css';

const CheckoutDone = () => {
	const data = {
		name: 'Patrick',
		email: 'email@gm.pl',
		tel: '123456789',
		address: 'ulica',
		'zip-code': '12345',
		city: 'Warsaw',
		country: 'Poland',
		'payment-method': 'card',
	};

	// console.log(data);

	const dataElements = Object.entries(data).map(element => {
		let title = element[0].charAt(0).toUpperCase() + element[0].slice(1);
		const value = element[1];

		if (title.includes('-')) {
			title = title.replace('-', ' ');
		}

		return (
			<div key={title}>
				<dt>{`${title}:`}</dt>
				<dd>{value}</dd>
			</div>
		);
	});

	return (
		<main>
			<h1>Checkout successful!</h1>
			<p>Checkout successfuly commited with following data:</p>
			<dl>{dataElements}</dl>
		</main>
	);
};

export default CheckoutDone;
