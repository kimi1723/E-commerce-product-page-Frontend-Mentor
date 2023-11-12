import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import classes from './Authentication.module.css';

const Authentication = ({ hideAuthentication, classesProvided }) => {
	const { isSignedIn } = useSelector(state => state.authentication);

	const variants = {
		hover: { scale: 1.05 },
	};

	return (
		<>
			<motion.section
				className={classesProvided}
				initial={{ opacity: 0, y: -30, x: '-50%' }}
				animate={{ opacity: 1, y: 0, x: '-50%' }}
				exit={{ opacity: 0, y: -30, x: '-50%' }}>
				{!isSignedIn && (
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
				)}
			</motion.section>
		</>
	);
};

export default Authentication;
