import express from 'express';
import { CustomError } from '../errors/custom-error';

function errorHandler(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
	
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.formatError() });
	}

	return res.status(400).send({
		errors: [{ message: 'Something went wrong...' }]
	});
	
} 

export default errorHandler;