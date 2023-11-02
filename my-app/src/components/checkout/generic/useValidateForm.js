import { useEffect, useState, useRef } from 'react';

let prom = new Promise(res => res);

const useValidateForm = (stringToValidate, stringType) => {
	const [string, setValid] = useState('');
	const [isError, setIsError] = useState(false);

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		switch (stringType) {
	// 			case 'name':
	// 				setIsError(stringToValidate.trim().length < 3 ? true : false);
	// 				break;
	// 			default:
	// 				return;
	// 		}
	// 	}, 500);

	// 	return () => {
	// 		clearTimeout(timeout);
	// 	};
	// });

	useEffect(() => {
		const timeout = setTimeout(() => {
			prom = new Promise(res => setTimeout(res, 500));
			switch (string.stringType) {
				case 'name':
					setIsError(string.stringToValidate.trim().length < 3 ? true : false);
					break;
				default:
					return;
			}
		}, 500);

		return () => {
			prom = Promise.resolve();
			clearTimeout(timeout);
		};
	});

	return async (stringToValidate, stringType) => {
		setValid({ stringToValidate, stringType });
		const d = await prom;
		console.log(prom);

		if (d) {
			console.log('e');
			return isError;
		}
	};
};

export default useValidateForm;
