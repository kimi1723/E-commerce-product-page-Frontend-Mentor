import { Link } from 'react-router-dom';

import classes from './Error.module.css';

const Error = ({ title, message }) => {
	return (
		<main className={classes.main}>
			<h1 className={classes.h1}>{title}</h1>
			<p className={classes['error-text']}> {message}</p>
			<Link to="/" className={classes.link}>
				Get back to home page
			</Link>
		</main>
	);
};

export default Error;
