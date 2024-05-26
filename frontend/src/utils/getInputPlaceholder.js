const getInputPlaceholder = inputKey => {
	switch (inputKey) {
		case 'name':
			return 'Enter name...';
		case 'email':
			return 'Enter email...	';
		case 'tel':
			return 'Enter phone number...';
		case 'address':
			return 'Enter address...';
		case 'city':
			return 'Enter city...';
		case 'zipCode':
			return 'Enter ZIP code...';
		case 'password':
			return 'Enter password...';
		default:
			return 'Enter value...';
	}
};

export default getInputPlaceholder;
