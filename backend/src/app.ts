import dotenv from 'dotenv';
import express, { RequestHandler } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';
import connectMongoDBSession from 'connect-mongodb-session';
import { User } from './models/user';
import { IUser } from './types/user';
import { authRoutes } from './routes/auth';
import { shopRoutes } from './routes/shop';
import { catchError } from './utils/catchError';

dotenv.config();

const MongoDBStore = connectMongoDBSession(session);

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qfooitn.mongodb.net/shop`;

const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions' });

app.use(bodyParser.json());
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store }));

app.use((async (req, res, next) => {
	if (!req.session.user) return next();

	try {
		const user = (await User.findById(req.session.user._id)) as IUser;
		req.user = user;

		next();
	} catch (err) {
		return catchError(err, res);
	}
}) as RequestHandler);

app.use(shopRoutes);
app.use(authRoutes);

(async () => {
	try {
		await connect(MONGODB_URI);

		console.log('server running');

		app.listen(8080);
	} catch (err) {
		console.log(err);
	}
})();
