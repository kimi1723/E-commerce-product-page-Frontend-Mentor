import DisplayData from '../generic/DisplayData';

const PersonalInformation = ({ data }) => {
	const dataSkeleton = {
		address: '',
		city: '',
		country: '',
		email: '',
		name: '',
		tel: '',
		zipCode: '',
	};

	return (
		<>
			<h1>Personal information</h1>
			<DisplayData data={data || dataSkeleton} />
		</>
	);
};

export default PersonalInformation;
