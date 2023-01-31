import express from 'express';
import { json } from 'body-parser';
import { getCurrentUser } from './routes/get-current-user';
import { signInUser } from './routes/signin';
import { signOutUser } from './routes/signout';
import { signUpUser } from './routes/signup';

const app = express();
app.use(json());

app.use(getCurrentUser);
app.use(signInUser);
app.use(signOutUser);
app.use(signUpUser);

app.listen(8000, () => {
	console.log('Listening on port 8000');
});