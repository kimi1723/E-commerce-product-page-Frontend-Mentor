const validateInput = (stringToValidate, stringType) => {
	switch (stringType) {
		case 'name':
			const nameValidation = stringToValidate.trim().length < 3 ? true : false;
			return nameValidation;
		case 'email':
			const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
			const emailValidation = stringToValidate.match(emailRegEx) ? true : false;

			return !emailValidation;
		case 'tel':
			const telRegEx = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
			const telValidation = stringToValidate.match(telRegEx) ? true : false;

			return !telValidation;
		default:
			console.log('error validating');
	}
};

export default validateInput;
