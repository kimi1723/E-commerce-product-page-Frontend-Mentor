import { useState } from 'react';

import classes from './PersonalInformation.module.css';
import { Form } from 'react-router-dom';

const PersonalInformation = ({ data: { email, password } }) => {
	const [isEmailVisible, setIsEmailVisible] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isEdditingEmail, setIsEdditingEmail] = useState(false);
	const [isEdditingPassword, setIsEdditingPassword] = useState(false);
	const [passwordValue, setPasswordValue] = useState(password);
	const [previousPasswordValue, setPreviousPasswordValue] = useState(passwordValue);
	const [emailValue, setEmailValue] = useState(email);
	const [previousEmailValue, setPreviousEmailValue] = useState(emailValue);

	const emailVisibilityHandler = () => setIsEmailVisible(prevState => !prevState),
		passwordVisibilityHandler = () => setIsPasswordVisible(prevState => !prevState);

	const isEdditingEmailHandler = () => setIsEdditingEmail(true),
		isEdditingPasswordHandler = () => setIsEdditingPassword(true);

	const passwordSubmitHandler = () => {
			setIsEdditingPassword(false);
			setPreviousPasswordValue(passwordValue);
		},
		emailSubmitHandler = () => {
			setIsEdditingEmail(false);
			setPreviousEmailValue(emailValue);
		};

	const cancelPasswordEditHandler = () => {
			setIsEdditingPassword(false);
			setPasswordValue(previousPasswordValue);
		},
		cancelEmailEditHandler = () => {
			setIsEdditingEmail(false);
			setEmailValue(previousEmailValue);
		};

	const hideContent = originalContent => {
		const originalContentSplit = [...originalContent];

		const hiddenContent = originalContentSplit.map(() => '*');

		return [...hiddenContent];
	};

	const editPasswordHandler = e => setPasswordValue(e.target.value),
		editEmailHandler = e => setEmailValue(e.target.value);

	return (
		<>
			<h1 className={classes.h1}>Credentials</h1>
			<dl className={classes.dl}>
				<div className={classes['item-container']}>
					<dt>Email</dt>
					<dd>
						<Form method="post" className={classes['credential-container']} onSubmit={emailSubmitHandler}>
							{!isEdditingEmail && (isEmailVisible ? emailValue : hideContent(emailValue))}
							{isEdditingEmail && (
								<>
									{isEmailVisible ? (
										<input value={emailValue} onChange={editEmailHandler} name="email" type="email" />
									) : (
										<input value={emailValue} onChange={editEmailHandler} name="email" type="password" />
									)}
									<button>Accept</button>
									<button onClick={cancelEmailEditHandler}>Cancel</button>
								</>
							)}
						</Form>

						<div className={classes['btns-container']}>
							<button type="button" className={classes['functional-btn']} onClick={emailVisibilityHandler}>
								{isEmailVisible ? 'Hide' : 'Show'}
							</button>
							<button type="button" className={classes['functional-btn']} onClick={isEdditingEmailHandler}>
								Edit
							</button>
						</div>
					</dd>
				</div>

				<div className={classes['item-container']}>
					<dt>Password</dt>
					<dd>
						<Form method="post" className={classes['credential-container']} onSubmit={passwordSubmitHandler}>
							{!isEdditingPassword && (isPasswordVisible ? passwordValue : hideContent(passwordValue))}

							{isEdditingPassword && (
								<>
									{isPasswordVisible ? (
										<input type="text" value={passwordValue} name="password" onChange={editPasswordHandler} />
									) : (
										<input type="password" value={passwordValue} name="password" onChange={editPasswordHandler} />
									)}
									<button type="submit" className={classes['accept-btn']}>
										Accept
									</button>
									<button type="button" onClick={cancelPasswordEditHandler} className={classes['cancel-btn']}>
										Cancel
									</button>
								</>
							)}
						</Form>

						<div className={classes['btns-container']}>
							<button type="button" className={classes['functional-btn']} onClick={passwordVisibilityHandler}>
								{isPasswordVisible ? 'Hide' : 'Show'}
							</button>
							<button type="button" className={classes['functional-btn']} onClick={isEdditingPasswordHandler}>
								Edit
							</button>
						</div>
					</dd>
				</div>
			</dl>
		</>
	);
};

export default PersonalInformation;
