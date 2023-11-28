const getInputPlaceholder = inputKey => {
	switch (inputKey) {
		case 'address':
			return 'Enter address...';
		default:
			return 'essa';
	}
};

export default getInputPlaceholder;
