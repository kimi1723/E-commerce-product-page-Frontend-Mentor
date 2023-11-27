import DisplayPersonalData from '../generic/DisplayPersonalData';

const PersonalInformation = ({ data }) => {
	const hiddenData = [
		{ shouldHide: 'email', isHidden: true },
		{ shouldHide: 'password', isHidden: true },
	];

	return (
		<>
			<h1>Credentials</h1>
			<DisplayPersonalData data={data} hiddenData={hiddenData} />
		</>
	);
};

export default PersonalInformation;
