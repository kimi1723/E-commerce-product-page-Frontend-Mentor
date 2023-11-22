import { Await, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import Account from '../../components/account/MyAccount';
import getProductsData from '../../utils/getProductsData';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import getUid from '../../utils/getUid';

const AccountPage = () => {
	const { ordersData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="my account" />}>
			<Await resolve={ordersData}>{loadedData => <Account ordersData={loadedData} />}</Await>
		</Suspense>
	);
};

const accountLoader = async () => {
	const uid = await getUid(true);
	const ordersData = (await getProductsData(`users/validated/${uid}/userOrders`)) || {};

	if (ordersData.error) return { error: ordersData.error.message };

	return ordersData;
};

export const loader = () => {
	return defer({
		ordersData: accountLoader(),
	});
};

export default AccountPage;
