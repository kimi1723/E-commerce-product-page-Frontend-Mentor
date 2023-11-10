import { Link } from 'react-router-dom';

import classes from './Profile.module.css';

const Profile = () => {
	return (
		<main className={classes.main}>
			<section>
				<h2>My account</h2>
				<ul>
					<li>
						<Link>Account settings</Link>
					</li>
					<li>
						<Link>My orders</Link>
					</li>
					<li>Logout</li>
				</ul>
			</section>
		</main>
	);
};

export default Profile;
