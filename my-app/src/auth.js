import { getAuth, signInAnonymously } from 'firebase/auth';

const auth = getAuth();

const getUid = async () => {
	try {
		const signIn = await signInAnonymously(auth);
		console.log(signIn.user.uid);

		return signIn.user.uid;
	} catch (error) {
		console.log('error auth');
	}
};

export default getUid;
