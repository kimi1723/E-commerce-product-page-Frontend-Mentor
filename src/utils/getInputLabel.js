const getInputLabel = inputName => {
	switch (inputName) {
		case 'email':
			return 'Email address';
		case 'tel':
			return 'Phone Number';
		case 'zipCode':
			return 'ZIP Code';
		default:
			return inputName.charAt(0).toUpperCase() + inputName.slice(1);
	}
};

export default getInputLabel;
