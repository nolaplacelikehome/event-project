import express from 'express';
import { validationResult, body } from 'express-validator';
import { RequestValidationError } from '../errors/request-error';
import { DbConnectionError } from '../errors/db-connection-error';

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
		
		throw new DbConnectionError();
		console.log('Creating a user...');

		res.send({});
	

});

export { router as signUpUser };