import { useState } from 'react';
import classes from './PersonalInformation.module.css';

const PersonalInformation = ({ data: { email, password } }) => {
	const [isEmailVisible, setIsEmailVisible] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isEdditingEmail, setIsEdditingEmail] = useState(false);
	const [isEdditingPassword, setIsEdditingPassword] = useState(false);
	const [passwordValue, setPasswordValue] = useState(password);
	const [emailValue, setEmailValue] = useState(email);

	const emailVisibilityHandler = () => setIsEmailVisible(prevState => !prevState),
		passwordVisibilityHandler = () => setIsPasswordVisible(prevState => !prevState);

	const isEdditingEmailHandler = () => setIsEdditingEmail(true),
		isEdditingPasswordHandler = () => setIsEdditingPassword(true);

	const cancelPasswordEditHandler = () => setIsEdditingPassword(false),
		cancelEmailEditHandler = () => setIsEdditingEmail(false);

	const hideContent = originalContent => {
		const originalContentSplit = [...originalContent];

		const hiddenContent = originalContentSplit.map(() => '*');

		return [...hiddenContent];
	};

	const editPasswordHandler = e => setPasswordValue(e.target.value),
		editEmailHandler = e => setEmailValue(e.target.value);

	const acceptPasswordEditHandler = () => {},
		acceptEmailEditHandler = () => {};

	return (
		<>
			<h1 className={classes.h1}>Credentials</h1>
			<dl className={classes.dl}>
				<div className={classes['item-container']}>
					<dt>Email</dt>
					<dd>
						<div className={classes['credential-container']}>
							{!isEdditingEmail && isEmailVisible ? email : hideContent(email)}
							{isEdditingEmail && (
								<>
									<input value={emailValue} onChange={editEmailHandler} />
									<button onClick={acceptEmailEditHandler}>Accept</button>
									<button onClick={cancelEmailEditHandler}>Cancel</button>
								</>
							)}
						</div>

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
						<div className={classes['credential-container']}>
							{!isEdditingPassword && (isPasswordVisible ? password : hideContent(password))}

							{isEdditingPassword && (
								<>
									<input value={passwordValue} onChange={editPasswordHandler} />
									<button onClick={acceptPasswordEditHandler}>Accept</button>
									<button onClick={cancelPasswordEditHandler}>Cancel</button>
								</>
							)}
						</div>

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
