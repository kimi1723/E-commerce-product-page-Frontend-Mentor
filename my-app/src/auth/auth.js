import { getAuth, signInAnonymously } from 'firebase/auth';

const auth = getAuth();

const getUid = async () => {
	try {
		const signIn = await signInAnonymously(auth);

		return signIn.user.uid;
	} catch (error) {
		console.log(error);
	}
};

export default getUid;
