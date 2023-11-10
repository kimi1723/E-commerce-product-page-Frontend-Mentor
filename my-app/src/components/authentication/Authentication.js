import { Link } from 'react-router-dom';

import classes from './Authentication.module.css';

const Auth = ({ isSignIn }) => {
	console.log(isSignIn);
	return <>{`Is sign in: ${isSignIn}`}</>;
};

export default Auth;
