const validateForm = (stringToValidate, stringType) => {
	switch (stringType) {
		case 'name':
			return stringToValidate.trim().length < 3 ? true : false;
		default:
			return;
	}
};

export default validateForm;
