import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Form, Link, useActionData, useNavigation, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import useValidation from '../../hooks/useValidation';

import getInputLabel from '../../utils/getInputLabel';
import getInputType from '../../utils/getInputType';
import getInputPlaceholder from '../../utils/getInputPlaceholder';

import classes from './Authentication.module.css';

const Authentication = () => {
	const { error, errorMessage } = useActionData() || {};
	const [searchParams] = useSearchParams();
	const [credentials, setCredentials] = useState({ email: '', password: '' });
	const [isTouchedState, setIsTouchedState] = useState({
		email: false,
		password: false,
	});
	const { isSignedIn } = useSelector(state => state.authentication);
	const navigation = useNavigation();
	const navigate = useNavigate();

	const errors = useValidation(credentials, isTouchedState);

	useEffect(() => {
		if (isSignedIn) {
			navigate('/account/myaccount');
		}
	}, []);

	const credentialsKeys = Object.keys(credentials);

	const anyErrors = Object.values(errors).filter(({ isError }) => isError === true);

	const notEverythingIsTouched = Object.values(isTouchedState).includes(false);

	const isSignIn = searchParams.get('mode') === 'signin';

	const isSubmitting = navigation.state === 'submitting';

	const inputChangeHandler = e => {
		const key = e.target.name;
		const value = e.target.value;

		setCredentials(prevValues => ({ ...prevValues, [key]: value }));
		inputTouchedHandler(e);
	};

	const inputTouchedHandler = e => {
		const key = e.target.name;

		setIsTouchedState(prevValues => ({ ...prevValues, [key]: true }));
	};

	const credentialsInputs = credentialsKeys.map(key => {
		const { isError, errorFeedback } = errors[key] || {};
		const isTouched = isTouchedState[key];

		const inputType = getInputType(key);
		const inputPlaceholder = getInputPlaceholder(key);
		const label = getInputLabel(key);

		let value = credentials[key];

		return (
			<p className={classes['input-container']} key={key}>
				{isError && isTouched && <span className={classes.error}>{errorFeedback}</span>}

				<label htmlFor={key} className={classes.label}>
					{label}
				</label>

				<input
					id={key}
					name={key}
					type={inputType}
					className={classes.input}
					onChange={inputChangeHandler}
					onBlur={inputTouchedHandler}
					value={value}
					placeholder={inputPlaceholder}
				/>
			</p>
		);
	});

	return (
		<main className={classes.main}>
			<Form method="post" className={classes.form}>
				<h1>{isSignIn ? 'Sign in' : 'Create new account'}</h1>
				{credentialsInputs}

				<div className={classes.actions}>
					<p className={classes['change-mode']}>
						{isSignIn ? `You don't have an account yet?` : 'Already a member?'}
						<Link to={`?mode=${isSignIn ? 'signup' : 'signin'}`} className={classes.link}>
							{isSignIn ? 'Create new one' : 'Sign in'}
						</Link>
					</p>

					{error && <p className={classes.error}>{errorMessage}</p>}
					<motion.button
						type="submit"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 1.1 }}
						whileFocus={{ scale: 1.05 }}
						transition={{ type: 'spring', stiffness: 500 }}
						disabled={anyErrors.length > 0 || notEverythingIsTouched || isSubmitting}
						className={classes.btn}>
						{isSubmitting ? 'Submiting...' : isSignIn ? 'Sign in' : 'Sign up'}
					</motion.button>
				</div>
			</Form>
		</main>
	);
};

export default Authentication;
