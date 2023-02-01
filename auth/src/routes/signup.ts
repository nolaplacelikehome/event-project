import express from 'express';
import { validationResult, body } from 'express-validator'

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
	(req: express.Request, res: express.Response) => {
		const { email, password } = req.body;

		const errors = validationResult(req);

		if(!errors.isEmpty()) {
			return res.status(400).send(errors.array());
		}
		
		console.log('Creating a user...');

		res.send({});
	

});

export { router as signUpUser };