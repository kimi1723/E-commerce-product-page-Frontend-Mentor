import DisplayPersonalData from '../generic/DisplayPersonalData';

const ShipmentDetails = ({ data = {} }) => {
	const dataSkeleton = {
		address: '',
		city: '',
		country: '',
		email: '',
		name: '',
		tel: '',
		'zip-code': '',
	};

	return (
		<>
			<h1>Shipment detailss</h1>
			<DisplayPersonalData data={data || dataSkeleton} />
		</>
	);
};

export default ShipmentDetails;
