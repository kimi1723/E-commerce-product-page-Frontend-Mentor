import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import classes from './Account.module.css';
import SignoutBtn from '../../ui/buttons/SignoutBtn';

const Account = ({ hideAuthentication, classesProvided }) => {
	const { isSignedIn } = useSelector(state => state.authentication);

	const variants = {
		hover: { scale: 1.05 },
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
					Shipment details
				</Link>
			</li>
			<li className={classes['signed-li']}>
				<SignoutBtn className={classes['signout-btn']} />
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
