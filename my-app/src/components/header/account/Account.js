import { useSelector, useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getUid from '../../../utils/getAnonymousToken';
import setFirebaseData from '../../../utils/setFirebaseData';
import { authenticationActions } from '../../../store/authentication-slice';

import classes from './Account.module.css';

const Account = ({ hideAuthentication, classesProvided }) => {
	const { isSignedIn } = useSelector(state => state.authentication);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const variants = {
		hover: { scale: 1.05 },
	};

	const logoutHandler = async () => {
		const uid = await getUid();

		navigate('/');
		setFirebaseData(`/users/anonymousTokens/${uid}/isSignedIn`, { status: false });
		dispatch(
			authenticationActions.changeAuthenticationState({ isSignedIn: false, email: '', signedOutByLogout: true }),
		);
	};

	const notSignedInContent = (
		<motion.dl className={classes.list}>
			<dt className={classes.title}>Already have an account?</dt>
			<dd className={classes.desc}>
				<motion.span className={classes.span} variants={variants} whileHover="hover">
					<Link to="/authentication?mode=signin" className={classes.link} onClick={hideAuthentication}>
						Sign in
					</Link>
				</motion.span>
			</dd>
			<dt className={classes.title}>Is this your first time here?</dt>
			<dd className={classes.desc}>
				<motion.span className={classes.span} variants={variants} whileHover="hover">
					<Link to="/authentication?mode=signup" className={classes.link} onClick={hideAuthentication}>
						Sign up
					</Link>
				</motion.span>
			</dd>
		</motion.dl>
	);

	const signedInContent = (
		<ul className={classes['signed-list']}>
			<li className={classes['signed-li']}>
				<Link to="account/orders" className={classes['signed-link']}>
					Orders
				</Link>
			</li>
			<li className={classes['signed-li']}>
				<Link to="account/personal-information" className={classes['signed-link']}>
					Personal information
				</Link>
			</li>
			<li className={classes['signed-li']}>
				<Link to="account/shipment-information" className={classes['signed-link']}>
					Shipment information
				</Link>
			</li>
			<li className={classes['signed-li']}>
				<button type="button" className={classes['logout-btn']} onClick={logoutHandler}>
					Logout
				</button>
			</li>
		</ul>
	);

	return (
		<>
			<motion.section
				className={classesProvided}
				initial={{ opacity: 0, y: 30, x: '-50%' }}
				animate={{ opacity: 1, y: 0, x: '-50%' }}
				exit={{ opacity: 0, y: 30, x: '-50%' }}
				transition={{ duration: 0.2 }}>
				{!isSignedIn && notSignedInContent}
				{isSignedIn && signedInContent}
			</motion.section>
		</>
	);
};

export default Account;
