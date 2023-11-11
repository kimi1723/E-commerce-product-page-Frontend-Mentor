import { Link } from 'react-router-dom';

import classes from './Account.module.css';

const Account = ({ isSignIn }) => {
	console.log(isSignIn);

	// <main className={classes.main}>
	// 	<section>
	// 		<h2>My account</h2>
	// 		<ul>
	// 			<li>
	// 				<Link>Account settings</Link>
	// 			</li>
	// 			<li>
	// 				<Link>My orders</Link>
	// 			</li>
	// 			<li>Logout</li>
	// 		</ul>
	// 	</section>
	// </main>
};

export default Account;
