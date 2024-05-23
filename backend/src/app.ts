import dotenv from 'dotenv';
import express, { Express, RequestHandler } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';
import connectMongoDBSession from 'connect-mongodb-session';
import { User } from './models/User';
import { IUser } from './types';
import { authRoutes } from './routes/auth';

dotenv.config();

const MongoDBStore = connectMongoDBSession(session);

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qfooitn.mongodb.net/shop`;

const app: Express = express();
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
		console.log(err);

		return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
	}
}) as RequestHandler);

app.use(authRoutes);

(async () => {
	try {
		await connect(MONGODB_URI);

		console.log('server running');

		app.listen(3000);
	} catch (err) {
		console.log(err);
	}
})();
