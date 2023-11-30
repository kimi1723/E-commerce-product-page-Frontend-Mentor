import { useEffect, useState } from 'react';

const validateInput = (key, value) => {
	value.toString();

	switch (key) {
		case 'name':
			const nameValidation = value.trim().length < 3;
			const nameFeedback = 'Name should be at least 3 characters long!';

			return [nameValidation, nameFeedback];
		case 'email':
			const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
			const emailValidation = value.trim().match(emailRegEx);
			const emailFeedback = 'Please enter a valid email address!';

			return [!emailValidation, emailFeedback];
		case 'tel':
			const telRegEx = /^[+]?[(]?[0-9]{2}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
			const telValidation = value.trim().match(telRegEx);
			const telFeedback = 'Please enter a valid phone number!';

			return [!telValidation, telFeedback];
		case 'address':
			const addressValidation = value.trim().length < 4;
			const addressFeedback = 'Your address should contain at least 4 characters!';

			return [addressValidation, addressFeedback];
		case 'zipCode':
			const zipCodeValidation = value.trim().length < 2;
			const zipCodeFeedback = 'Your zip code should at least be 2 characters length!';

			return [zipCodeValidation, zipCodeFeedback];
		case 'city':
			const cityValidation = value.trim().length < 5;
			const cityFeedback = 'Your city should at least be 5 characters length!';

			return [cityValidation, cityFeedback];
		case 'country':
			const countryValidation = value !== null && value.trim() !== '';
			const countryFeedback = 'Please select a country!';

			return [!countryValidation, countryFeedback];
		case 'password':
			const passwordValidation = value.trim().length > 7;
			const passwordFeedback = 'Your password should be at least 8 characters long!';

			return [!passwordValidation, passwordFeedback];
		default:
			return [true, 'An unexpected error has occured! Please try again later.'];
	}
};

const useValidation = (inputs, isTouchedState) => {
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const inputsKeys = Object.keys(inputs);

		const errorsInitial = {};

		inputsKeys.forEach(key => {
			errorsInitial[key] = { isError: false, errorFeedback: '' };
		});

		setErrors(errorsInitial);
	}, []);

	useEffect(() => {
		const inputsEntries = Object.entries(inputs);

		inputsEntries.forEach(input => {
			const [key, value] = input;

			const timeout = setTimeout(() => {
				const [isError, errorFeedback] = validateInput(key, value);

				setErrors(prevErrors => ({
					...prevErrors,
					[key]: { isError, errorFeedback },
				}));
			}, 500);

			return () => {
				clearTimeout(timeout);
			};
		});
	}, [inputs, isTouchedState]);

	return errors;
};

export default useValidation;
