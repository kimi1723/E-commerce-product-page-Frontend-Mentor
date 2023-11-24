import { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';

import useValidation from '../../../hooks/useValidationRefactor';
import getInputType from '../../../utils/getInputType';

import classes from './DisplayPersonalData.module.css';

const DisplayPersonalData = ({ data }) => {
	const [inputsData, setInputsData] = useState(data);
	const [previousInputsData, setPreviousInputsData] = useState(inputsData);
	const [currentEdits, setCurrentEdits] = useState({});

	const errors = useValidation(inputsData, true);

	const dataKeys = Object.keys(data);

	useEffect(() => {
		const editsInitial = {};

		dataKeys.forEach(key => {
			editsInitial[key] = false;
		});

		setCurrentEdits(editsInitial);
	}, []);

	const inputChangeHandler = e => {
		const key = e.target.name;
		const value = e.target.value;

		setInputsData(prevValues => {
			return { ...prevValues, [key]: value };
		});
	};

	const isEdditingHandler = key => setCurrentEdits(prevEditsState => ({ ...prevEditsState, [key]: true }));

	const onSubmitHandler = key => {
		setCurrentEdits(prevEditsState => ({ ...prevEditsState, [key]: false }));
		setPreviousInputsData(inputsData);
	};

	const cancelEditHandler = key => {
		setInputsData(previousInputsData);
		setCurrentEdits(prevEditsState => ({ ...prevEditsState, [key]: false }));
	};

	const content = dataKeys.map(key => {
		const inputType = getInputType(key);
		const { isError, errorFeedback } = errors[key] || {};
		const isEdditing = currentEdits[key];
		const value = inputsData[key];
		const shouldHide = false;

		return (
			<div className={classes['item-container']} key={key}>
				<dt>
					<label htmlFor={key}>{key}</label>
				</dt>

				<dd>
					<Form method="post" className={classes.form} onSubmit={() => onSubmitHandler(key)}>
						{isError && <p className={classes.error}>{errorFeedback}</p>}
						{!isEdditing && <p>{value}</p>}
						{isEdditing && (
							<>
								<input type={inputType} name={key} value={value} onChange={inputChangeHandler} />
								<div className={classes['form-btns']}>
									<button type="submit" className={classes['functional-btn']} disabled={isError}>
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
						{shouldHide && <button type="button" className={classes['functional-btn']}></button>}

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
