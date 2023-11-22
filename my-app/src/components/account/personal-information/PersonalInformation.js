import { useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from './PersonalInformation.module.css';
import setFirebaseData from '../../../utils/setFirebaseData';
import getUid from '../../../utils/getUid';
import Error from '../../error/Error';
import { errorActions } from '../../../store/error-slice';
import { Form } from 'react-router-dom';

const PersonalInformation = ({ data: { email, password } }) => {
	const [isEmailVisible, setIsEmailVisible] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isEdditingEmail, setIsEdditingEmail] = useState(false);
	const [isEdditingPassword, setIsEdditingPassword] = useState(false);
	const [passwordValue, setPasswordValue] = useState(password);
	const [emailValue, setEmailValue] = useState(email);
	const dispatch = useDispatch();

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

	const acceptEditHandler = async (e, credentialType) => {
		e.preventDefault();

		try {
			const uid = await getUid();
			const userAccountUid = await getUid('accountUid');
			let responseUrl, anonymousResponseUrl, responseData;

			if (credentialType === 'password') {
				responseUrl = `/users/validated/${userAccountUid}/credentials`;
				anonymousResponseUrl = `users/anonymousTokens/${uid}/credentials`;
				responseData = { email, password: passwordValue };
			} else {
				responseUrl = `/users/validated/${userAccountUid}/credentials`;
				anonymousResponseUrl = `users/anonymousTokens/${uid}/credentials`;
				responseData = {
					email: emailValue,
					password,
					userAccountUid,
				};
			}

			const response = await setFirebaseData(responseUrl, responseData);
			const anonymousResponse = await setFirebaseData(anonymousResponseUrl, responseData);

			if (response.status === 500 || anonymousResponse === 500) {
				throw new Error(response.error || anonymousResponse.error);
			}

			credentialType === 'password' ? setIsEdditingPassword(false) : setIsEdditingEmail(false);
		} catch (error) {
			dispatch(
				errorActions.setError({
					isError: true,
					message: {
						content: 'An unexpected error happened',
						error: error.code || error.message,
					},
				}),
			);
		}
	};

	return (
		<>
			<h1 className={classes.h1}>Credentials</h1>
			<dl className={classes.dl}>
				<div className={classes['item-container']}>
					<dt>Email</dt>
					<dd>
						<Form method="post" className={classes['credential-container']}>
							{!isEdditingEmail && isEmailVisible ? email : hideContent(email)}
							{isEdditingEmail && (
								<>
									<input value={emailValue} onChange={editEmailHandler} name="email" />
									<button
									// onClick={e => acceptEditHandler(e, 'email')}
									>
										Accept
									</button>
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
						<Form method="post" className={classes['credential-container']}>
							{!isEdditingPassword && (isPasswordVisible ? password : hideContent(password))}

							{isEdditingPassword && (
								<>
									{isPasswordVisible ? (
										<input type="text" value={passwordValue} name="password" onChange={editPasswordHandler} />
									) : (
										<input type="password" value={passwordValue} name="password" onChange={editPasswordHandler} />
									)}
									<button
										type="submit"
										className={classes['accept-btn']}
										// onClick={e => acceptEditHandler(e, 'password')}
									>
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
