import { useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from './PersonalInformation.module.css';
import setFirebaseData from '../../../utils/setFirebaseData';
import getUid from '../../../utils/getAnonymousToken';
import Error from '../../error/Error';
import ModalContent from '../../ui/modals/ModalContent';
import { errorActions } from '../../../store/error-slice';

const PersonalInformation = ({ data: { email, password } }) => {
	const [isEmailVisible, setIsEmailVisible] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isEdditingEmail, setIsEdditingEmail] = useState(false);
	const [isEdditingPassword, setIsEdditingPassword] = useState(false);
	const [passwordValue, setPasswordValue] = useState(password);
	const [emailValue, setEmailValue] = useState(email);
	const [isError, setIsError] = useState(false);
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

	const acceptPasswordEditHandler = async e => {
			e.preventDefault();

			try {
				const uid = await getUid();
				const response = await setFirebaseData(`/users/emails/${email}`, {
					password: passwordValue,
				});
				const anonymousResponse = await setFirebaseData(`users/anonymousTokens/${uid}/credentials`, {
					password: passwordValue,
				});

				if (response.status === 500 || anonymousResponse === 500) {
					throw new Error(response.error || anonymousResponse.error);
				}
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
		},
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
						<form onSubmit={acceptPasswordEditHandler} className={classes['credential-container']}>
							{!isEdditingPassword && (isPasswordVisible ? password : hideContent(password))}

							{isEdditingPassword && (
								<>
									{isPasswordVisible ? (
										<input type="text" value={passwordValue} onChange={editPasswordHandler} />
									) : (
										<input type="password" value={passwordValue} onChange={editPasswordHandler} />
									)}
									<button type="submit" className={classes['accept-btn']}>
										Accept
									</button>
									<button type="button" onClick={cancelPasswordEditHandler} className={classes['cancel-btn']}>
										Cancel
									</button>
								</>
							)}
						</form>

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
