import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import ShipmentDetails from '../../components/account/shipment-details/ShipmentDetails';
import getFirebaseData from '../../utils/getFirebaseData';
import getUid from '../../utils/getUid';
import LoaderSpinner from '../../components/ui/LoaderSpinner';

const ShipmentDetailsPage = () => {
	const { shipmentDetailsLoaderData } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="shipment details" />}>
			<Await resolve={shipmentDetailsLoaderData}>{loadedData => <ShipmentDetails data={loadedData} />}</Await>
		</Suspense>
	);
};

export const action = async ({ request }) => {
	const formData = await request.formData();
	console.log(formData);
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
