import { Suspense } from 'react';
import { Await, defer, useActionData, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ShipmentDetails from '../../components/account/shipment-details/ShipmentDetails';
import LoaderSpinner from '../../components/ui/LoaderSpinner';

import getFirebaseData from '../../utils/getFirebaseData';
import getUid from '../../utils/getUid';
import setFirebaseData from '../../utils/setFirebaseData';
import { errorActions } from '../../store/error-slice';

const ShipmentDetailsPage = () => {
	const { shipmentDetailsLoaderData } = useLoaderData();
	const changedValue = useActionData();
	const dispatch = useDispatch();

	if (changedValue) {
		const changeShipmentDetails = async () => {
			try {
				const previousData = await shipmentDetailsLoaderData;
				const userAccountUid = await getUid('accountUid');

				const newData = { ...previousData, ...changedValue };

				const response = await setFirebaseData(`/users/validated/${userAccountUid}/shipmentDetails`, newData);

				if (response.status !== 200) throw new Error(response.error);

				return newData;
			} catch (error) {
				dispatch(
					errorActions.setError({
						isError: true,
						message: {
							content: 'An unexpected error happened',
							error: error.code || error.message,
						},
					}),
				);
			}
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

	return Object.fromEntries(formData);
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
