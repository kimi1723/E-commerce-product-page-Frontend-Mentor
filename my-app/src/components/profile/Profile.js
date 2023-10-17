import { createPortal } from 'react-dom';
import Modal from '../ui/Modal';

import classes from './Profile.module.css';

const Profile = ({ hideProfile }) => {
	return (
		<>
			{createPortal(
				<main className={classes.main}>
					<h2 className={classes.h2}>Sorry, this feature is not available yet.</h2>
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
