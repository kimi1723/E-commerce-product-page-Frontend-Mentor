import { cleanup } from '@testing-library/react';
import { useEffect } from 'react';

const validateInput = (value, inputName) => {
	switch (inputName) {
		case 'name':
			const nameValidation = value.trim().length < 3;
			const nameFeedback = 'Name should be at least 3 characters long!';

			return [nameValidation, nameFeedback];
		case 'email':
			const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
			const emailValidation = value.match(emailRegEx);
			const emailFeedback = 'Please enter a valid email address!';

			return [!emailValidation, emailFeedback];
		case 'tel':
			const telRegEx = /^[+]?[(]?[0-9]{2}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
			const telValidation = value.match(telRegEx);
			const telFeedback = 'Please enter a valid phone number!';

			return [!telValidation, telFeedback];
		case 'address':
			const addressValidation = value.trim().length < 4;
			const addressFeedback = 'Your address should contain at least 4 characters!';

			return [addressValidation, addressFeedback];
		case 'zip-code':
			const zipCodeValidation = value.trim().length < 2;
			const zipCodeFeedback = 'Your zip code should at least be 2 characters length!';

			return [zipCodeValidation, zipCodeFeedback];
		case 'city':
			const cityValidation = value.trim().length < 5;
			const cityFeedback = 'Your city should at least be 5 characters length!';

			return [cityValidation, cityFeedback];
		case 'country':
			const countryValidation = value !== null;
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

const useValidation = (inputs, isTouched, setErrors) => {
	useEffect(() => {
		if (!isTouched) return;

		const inputsArray = Object.entries(inputs);

		inputsArray.forEach(input => {
			const [label, value] = input;

			const timeout = setTimeout(() => {
				const [isError, errorFeedback] = validateInput(value, label);

				setErrors(prevErrors => ({
					...prevErrors,
					[label]: { isError, errorFeedback },
				}));
			}, 500);

			return () => {
				clearTimeout(timeout);
			};
		});
	}, [inputs, setErrors, isTouched]);
};

export default useValidation;
