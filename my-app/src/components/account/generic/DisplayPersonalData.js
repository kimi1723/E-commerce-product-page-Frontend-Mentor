import { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';

import useValidation from '../../../hooks/useValidationRefactor';
import getInputType from '../../../utils/getInputType';

import classes from './DisplayPersonalData.module.css';

const DisplayPersonalData = ({ data, hiddenData = [] }) => {
	const [inputsData, setInputsData] = useState(data);
	const [previousInputsData, setPreviousInputsData] = useState(inputsData);
	const [currentEdits, setCurrentEdits] = useState({});
	const [isTouchedState, setIsTouchedState] = useState({});
	const [hiddenValues, setHiddenValues] = useState(hiddenData);

	const errors = useValidation(inputsData, true);

	const dataKeys = Object.keys(data);

	useEffect(() => {
		const initialData = {};

		dataKeys.forEach(key => {
			initialData[key] = false;
		});

		setIsTouchedState(initialData);
		setCurrentEdits(initialData);
	}, []);

	const inputChangeHandler = e => {
		const key = e.target.name;
		const value = e.target.value;

		setIsTouchedState(prevValues => ({ ...prevValues, [key]: true }));
		setInputsData(prevValues => ({ ...prevValues, [key]: value }));
	};

	const isEdditingHandler = key => setCurrentEdits(prevEditsState => ({ ...prevEditsState, [key]: true }));

	const cancelEditHandler = key => {
		setInputsData(previousInputsData);
		setCurrentEdits(prevEditsState => ({ ...prevEditsState, [key]: false }));
	};

	const onSubmitHandler = key => {
		setCurrentEdits(prevEditsState => ({ ...prevEditsState, [key]: false }));
		setPreviousInputsData(inputsData);
	};

	const isHiddenHandler = value => {
		setHiddenValues(prevValues => {
			const newValues = [...prevValues];
			const index = newValues.findIndex(obj => obj['shouldHide'] === value);

			newValues[index]['isHidden'] = !newValues[index]['isHidden'];

			return newValues;
		});
	};

	const hideContent = originalContent => {
		const originalContentSplit = [...originalContent];

		const hiddenContent = originalContentSplit.map(() => '*');

		return [...hiddenContent];
	};

	const content = dataKeys.map(key => {
		const { isError, errorFeedback } = errors[key] || {};
		const { shouldHide, isHidden } = hiddenValues.find(obj => obj['shouldHide'] === key) || {};
		const isTouched = isTouchedState[key];

		const inputType = getInputType(key);
		const isEdditing = currentEdits[key];
		const label = key.charAt(0).toUpperCase() + key.slice(1);

		let value = inputsData[key];

		if (value.length === 0) value = 'Yet to be filled!';

		return (
			<div className={classes['item-container']} key={key}>
				<dt>
					<label htmlFor={key}>{label}</label>
				</dt>

				<dd>
					<Form method="post" className={classes.form} onSubmit={() => onSubmitHandler(key)}>
						{isError && isTouched && <p className={classes.error}>{errorFeedback}</p>}
						{!isEdditing && <p>{isHidden ? hideContent(value) : value}</p>}
						{isEdditing && (
							<>
								{isHidden ? (
									<input type="password" name={key} value={value} onChange={inputChangeHandler} />
								) : (
									<input type={inputType} name={key} value={value} onChange={inputChangeHandler} />
								)}
								<div className={classes['form-btns']}>
									<button type="submit" className={classes['functional-btn']} disabled={isError && isTouched}>
										Accept
									</button>
									<button type="button" className={classes['functional-btn']} onClick={() => cancelEditHandler(key)}>
										Cancel
									</button>
								</div>
							</>
						)}
					</Form>

					<div className={classes['btns-container']}>
						{shouldHide && (
							<button type="button" className={classes['functional-btn']} onClick={() => isHiddenHandler(key)}>
								{isHidden ? 'Show' : 'Hide'}
							</button>
						)}

						{!isEdditing && (
							<button type="button" className={classes['functional-btn']} onClick={() => isEdditingHandler(key)}>
								Edit
							</button>
						)}
					</div>
				</dd>
			</div>
		);
	});

	return <dl className={classes.dl}>{content}</dl>;
};

export default DisplayPersonalData;
