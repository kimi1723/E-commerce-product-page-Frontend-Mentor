import { useState, useEffect } from 'react';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { motion } from 'framer-motion';

import classes from './Authentication.module.css';

const Authentication = ({ isSignIn }) => {
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const navigation = useNavigation();

	const isSubmitting = navigation.state === 'submitting';

	return (
		<main className={classes.main}>
			<Form method="post" className={classes.form}>
				<h1>{isSignIn ? 'Sign in' : 'Create new account'}</h1>
				<p className={classes['input-container']}>
					<p className={classes.error}>Please enter a valid email! font-size: 2rem;</p>
					<label htmlFor="email" className={classes.label}>
						Email
					</label>
					<input id="email" type="email" name="email" required className={classes.input} />
				</p>
				<p className={classes['input-container']}>
					<label htmlFor="password" className={classes.label}>
						Password
					</label>
					<input id="password" type="password" name="password" required className={classes.input} />
				</p>
				<div className={classes.actions}>
					<p className={classes['change-mode']}>
						{isSignIn ? `You don't have an account yet?` : 'Already a member?'}
						<Link to={`?mode=${isSignIn ? 'signup' : 'signin'}`} className={classes.link}>
							{isSignIn ? 'Create new one' : 'Sign in'}
						</Link>
					</p>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 1.1 }}
						whileFocus={{ scale: 1.05 }}
						transition={{ type: 'spring', stiffness: 500 }}
						disabled={isSubmitting}
						className={classes.btn}>
						{isSubmitting ? 'Submiting...' : isSignIn ? 'Sign in' : 'Sign up'}
					</motion.button>
				</div>
			</Form>
		</main>
	);
};

export default Authentication;
