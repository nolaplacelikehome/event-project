import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { getCurrentUser } from './routes/get-current-user';
import { signInUser } from './routes/signin';
import { signOutUser } from './routes/signout';
import { signUpUser } from './routes/signup';
import errorHandler from './middleware/errors';
import { BadPathError } from './errors/bad-path-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
	signed: false,
	secure: true
}));

app.use(getCurrentUser);
app.use(signInUser);
app.use(signOutUser);
app.use(signUpUser);
app.all('*', async () => {
	throw new BadPathError();
})

app.use(errorHandler);

const startDb = async () => {
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
		console.log('Connected to MongoDB');
		
	} catch (err) {
			console.log(err);
	}

	app.listen(8000, () => {
	console.log('Listening on port 8000');
});
	
}

startDb();