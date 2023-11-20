import { Await, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import Account from '../../components/account/MyAccount';
import getProductsData from '../../utils/getProductsData';
import LoaderSpinner from '../../components/ui/LoaderSpinner';

const AccountPage = () => {
	const { ordersData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="my account" />}>
			<Await resolve={ordersData}>{loadedData => <Account ordersData={loadedData} />}</Await>
		</Suspense>
	);
};

const accountLoader = async () => {
	const email = localStorage.getItem('email');
	const ordersData = (await getProductsData(`users/emails/${email}/userOrders`)) || {};

	if (ordersData.error) return { error: ordersData.error.message };

	return ordersData;
};

export const loader = () => {
	return defer({
		ordersData: accountLoader(),
	});
};

export default AccountPage;
