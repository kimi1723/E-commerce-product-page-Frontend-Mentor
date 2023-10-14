import { createPortal } from 'react-dom';
import Modal from '../ui/Modal';

import classes from './Profile.module.css';

const Profile = ({ hideProfile }) => {
	return (
		<>
			{createPortal(
				<main className={classes.main}>
					<h1 className={classes.h1}>Sorry, this feature is not available yet.</h1>
					<button className={classes.btn} onClick={hideProfile}>
						Okay
					</button>
				</main>,
				document.getElementById('profile'),
			)}
			<Modal onClick={hideProfile} />
		</>
	);
};

export default Profile;
