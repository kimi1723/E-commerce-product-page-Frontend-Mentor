import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	appId: process.env.appId,
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase();

export { storage, database };
