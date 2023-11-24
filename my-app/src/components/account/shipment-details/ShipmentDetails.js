import DisplayPersonalData from '../generic/DisplayPersonalData';

const ShipmentDetails = ({ data }) => {
	return (
		<>
			<h1>Shipment detailss</h1>
			<DisplayPersonalData data={data} />
		</>
	);
};

export default ShipmentDetails;
