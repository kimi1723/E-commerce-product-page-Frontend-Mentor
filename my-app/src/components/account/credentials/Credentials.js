import DisplayData from '../generic/DisplayData';

const Credentials = ({ data }) => {
	const hiddenData = [
		{ shouldHide: 'email', isHidden: true },
		{ shouldHide: 'password', isHidden: true },
	];

	return (
		<>
			<h1>Credentials</h1>
			<DisplayData data={data} hiddenData={hiddenData} />
		</>
	);
};

export default Credentials;
