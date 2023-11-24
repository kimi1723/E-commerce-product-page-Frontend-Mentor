import { Suspense } from 'react';
import { Await, defer, useActionData, useLoaderData } from 'react-router-dom';

import ShipmentDetails from '../../components/account/shipment-details/ShipmentDetails';
import getFirebaseData from '../../utils/getFirebaseData';
import getUid from '../../utils/getUid';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import setFirebaseData from '../../utils/setFirebaseData';

const ShipmentDetailsPage = () => {
	const { shipmentDetailsLoaderData } = useLoaderData();
	const changedValue = useActionData();

	if (changedValue) {
		const changeShipmentDetails = async () => {
			try {
				const previousData = await shipmentDetailsLoaderData;
				const uid = await getUid();
				const userAccountUid = await getUid('accountUid');

				const newData = { ...previousData, ...changedValue };

				const response = await setFirebaseData(`/users/validated/${userAccountUid}/shipmentDetails`, newData);

				if (response.status !== 200) {
					throw new Error(response.error);
				}

				return newData;
			} catch (error) {}
		};

		changeShipmentDetails();
	}

	return (
		<Suspense fallback={<LoaderSpinner title="shipment details" />}>
			<Await resolve={shipmentDetailsLoaderData}>{loadedData => <ShipmentDetails data={loadedData} />}</Await>
		</Suspense>
	);
};

export const action = async ({ request }) => {
	const formData = await request.formData();
	const changedValue = Object.fromEntries(formData);

	return changedValue;
};

const shipmentDetailsLoader = async () => {
	const uid = await getUid('accountUid');
	const shipmentDetailsLoaderData = await getFirebaseData(`/users/validated/${uid}/shipmentDetails`);

	return shipmentDetailsLoaderData;
};

export const loader = () => {
	return defer({
		shipmentDetailsLoaderData: shipmentDetailsLoader(),
	});
};

export default ShipmentDetailsPage;
