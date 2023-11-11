import { useEffect } from 'react';

const validateInput = (value, inputName) => {
	switch (inputName) {
		case 'name':
			const nameValidation = value.trim().length < 3;
			return nameValidation;
		case 'email':
			const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
			const emailValidation = value.match(emailRegEx);

			return !emailValidation;
		case 'tel':
			const telRegEx = /^[+]?[(]?[0-9]{2}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
			const telValidation = value.match(telRegEx);

			return !telValidation;
		case 'address':
			const addressValidation = value.trim().length < 4;

			return addressValidation;
		case 'zipCode':
			const zipCodeValidation = value.trim().length < 2;

			return zipCodeValidation;
		case 'city':
			const cityValidation = value.trim().length < 5;

			return cityValidation;
		case 'country':
			const countryValidation = value !== null;

			return !countryValidation;
		case 'password':
			const passwordValidation = value.trim().length > 7;

			return !passwordValidation;
		default:
			console.log('error validating');
	}
};

const useValidation = (value, inputName, isTouched, setErrors) => {
	useEffect(() => {
		if (!isTouched) return;

		const timeout = setTimeout(() => {
			const isValidated = validateInput(value, inputName);

			setErrors(prevErrors => ({
				...prevErrors,
				[inputName]: isValidated,
			}));
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, inputName, setErrors, isTouched]);
};

export default useValidation;
