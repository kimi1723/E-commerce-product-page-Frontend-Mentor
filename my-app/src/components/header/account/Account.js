import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import classes from './Account.module.css';

const Account = ({ hideAccount }) => {
	const variants = {
		hover: { scale: 1.05 },
		tap: { scale: 1.2 },
	};

	return (
		<motion.section
			className={classes.account}
			initial={{ opacity: 0, y: -30, x: '-50%' }}
			animate={{ opacity: 1, y: 0, x: '-50%' }}
			exit={{ opacity: 0, y: -30, x: '-50%' }}>
			<motion.dl className={classes.list}>
				<dt className={classes.title}>Already have an account?</dt>
				<dd className={classes.desc}>
					<motion.span className={classes.span} variants={variants} whileHover="hover" whileTap="tap">
						<Link to="/account/auth?mode=signin" className={classes.link}>
							Sign in
						</Link>
					</motion.span>
				</dd>
				<dt className={classes.title}>Is this your first time here?</dt>
				<dd className={classes.desc}>
					<motion.span className={classes.span} variants={variants} whileHover="hover" whileTap="tap">
						<Link to="/account/auth?mode=signup" className={classes.link}>
							Sign up
						</Link>
					</motion.span>
				</dd>
			</motion.dl>
		</motion.section>
	);
};

export default Account;
