import express from 'express';
import { validationResult, body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { RequestValidationError } from '../errors/request-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
	body('email')
		.isEmail()
		.withMessage('Not a valid email.'),
	body('password')
		.trim()
		.isLength({ min: 5, max: 20 })
		.withMessage('Please enter a valid password')
],
	async (req: express.Request, res: express.Response) => {
		const { email, password } = req.body;

		const errors = validationResult(req);

		if(!errors.isEmpty()) {
			throw new RequestValidationError(errors.array());
		}

		const presentUser = await User.findOne({ email });

		if (presentUser) {
			throw new BadRequestError('User exists');
		}

		const user = User.build({ email, password });
		await user.save();

		const userJwt = jwt.sign({
			id: user.id,
			email: user.email
		}, 'asdf');

		req.session = {
			jwt: userJwt
		};

		res.status(201).send(user);
});

export { router as signUpUser };