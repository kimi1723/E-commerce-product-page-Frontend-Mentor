import classes from './MyAccountRoot.module.css';

const MyAccount = ({ ordersData }) => {
	if (ordersData !== null && ordersData.error) {
		return (
			<>
				<h1 className={classes.h1}>An unexpected error has occured!</h1>
				<p className={classes['error-text']}>{ordersData.error}</p>
			</>
		);
	}

	const submittedOrdersAmount = Object.keys(ordersData).length;

	return (
		<>
			<h1 className={classes.h1}>Welcome back, user! {':)'}</h1>
			<p>Submitted orders amount: {submittedOrdersAmount}</p>
		</>
	);
};

export default MyAccount;
