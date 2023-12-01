import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const databaseURL = process.env.REACT_APP_DATABASE_URL;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;

const firebaseConfig = {
	apiKey,
	authDomain,
	databaseURL,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase();

export { storage, database };
